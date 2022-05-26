// require express
const express = require('express');

// import axios
const axios = require('axios');

// parse command line args
const parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2), opts={
    "string": "host",
    "default": {"port": 28070}
});

// set up app and port
var app = express()
var port = process.env.PORT || argv["port"];

// set up static files to serve
app.use(express.static('public'));
// app.use(express.urlencoded({
//     extended: true
// }))
app.use(express.json());

// set up routing
app.post('/deploy', async function (req, res) {
    let reqBody = {
        repo_url: req.body.repoUrl.toString(),
        repo_branch: req.body.repoBranch.toString(),
        deploy_config: null,
        service_config: null
    };

    if (!req.body.useRepoConfig) {
        const labels = {
            app: req.body.appName.toString()//,
            //tier: hasOwn(req.body.tier) ? req.body.appTier.toString() : null,
            //role: hasOwn(req.body.role) ? req.body.appRole.toString() : null
        };

        reqBody.deploy_config = {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: labels.app + "-deployment"
            },
            spec: {
                selector: {
                    matchLabels: labels
                },
                template: {
                    metadata: {
                        labels: labels
                    },
                    spec: {
                        containers: [{
                            name: req.body.containerName,
                            image: req.body.containerImage
                        }],
                    }
                },
                replicas: req.body.replicas,
            }
        };

        reqBody.service_config = {
            apiVersion: "v1",
            kind: "Service",
            metadata: {
                name: labels.app + "-service",
                labels: {
                    app: labels.app//,
                    //tier: labels.tier,
                    //role: labels.role
                }
            },
            spec: {
                selector: {
                    app: labels.app//,
                    //tier: labels.tier,
                    //role: labels.role
                },
                ports: [{
                    port: parseInt(req.body.servicePort),
                    targetPort: parseInt(req.body.containerPort),
                    protocol: req.body.netProtocol
                }],
                type: "ClusterIP"
            }
        };
    } else {
        if (req.body.deployConfigPath.toString() != '') {
            reqBody.deploy_config = req.body.deployConfigPath.toString();
        }

        if (req.body.serviceConfigPath.toString() != '') {
            reqBody.service_config = req.body.serviceConfigPath.toString();
        }
    }

    let request = JSON.stringify(reqBody);
    console.log("> New request for deployment: " + request);
    console.log("   Sending request to https://localhost:8800/build");

    let status;
    let resBody;
    let url = 'http://127.0.0.1:8800/build';
    //let url = 'http://127.0.0.1:12345/build';

    await axios.post(url, reqBody, {headers: {"content-type": "application/json"}})
        .then(function (response) {
            console.log("Response received, status OK");
            status = response.status;
            resBody = response.data;
        })
        .catch(function (error) {
            if (error.response) {
                console.log("Error: response status = " + error.response.status.toString());
                console.log("data = " + JSON.stringify(error.response.data));
                status = error.response.status;
                resBody = error.response.data;
            } else if (error.request) {
                console.log("Error: no response, returning status code 502");
                status = 502;
                resBody = {err: "Bad gateway."};
            } else {
                console.log("Error: unknown cause, returning status code 500");
                status = 500;
                resBody = {err: "Unknown internal server error: " + err.message};
            }
        });

    //console.log("Status: " + status.toString() + "\nBody: " + JSON.stringify(resBody));
    res.status(status).json(resBody);
});

// app.post('/build', function (req, res) {
//     res.status(500).json({err: "Failed to build: <build error>"});
// });

// open up server to traffic
if ("host" in argv) {
    app.listen(port, argv["host"], function() {
        console.log("== Server is listening on port ", port);
    });
} else {
    app.listen(port, function() {
        console.log("== Server is listening on port ", port);
    });
}
