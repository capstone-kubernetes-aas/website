// require express
var express = require('express');

// parse command line args
var parseArgs = require('minimist');
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
// app.get('/', function (req, res) {
//     res.redirect(200, "/index.html");
// });

app.post('/deploy', function (req, res) {
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
                            image: 'localhost:5000/' + req.body.containerImage
                        }],
                    }
                },
                replicas: req.body.replicas,
            }
        };

        reqBody.service_config = {
            apiVersion: "apps/v1",
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
                    port: req.body.servicePort,
                    targetPort: req.body.containerPort,
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
    console.log("   Sending request to https://localhost:8800");

    let url = "http://localhost:8800/"
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: request
    }
    
    let promise = fetch(url, requestOptions);
    console.log("Returned status " + promise.status.toString() + ", body: " + JSON.stringify(promise.json()));
    res.status(promise.status).json(promise.json());
});


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
