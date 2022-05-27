class LogoutButton extends React.Component {
    render() {
        return <button id="logout-button" name="logout" type="button">Logout</button>
    }
}


class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="title">
                    <h1 className="title-text">[Name Pending]</h1>
                </div>
                <div className="logout">
                    <LogoutButton />
                </div>
            </div>
        );
    }
}


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onContentChange(e);
    }

    render() {
        return (
            <div className="sidebar">
                <ul className="sidebar-list">
                    <li className="sidebar-tab"><button className={this.props.activeContent == "deploy-service" ? "active sidebar-option" : "sidebar-option"} id="deploy-service-button" name="deploy-service" type="button" onClick={this.handleClick}>Deploy New Service</button></li>
                    <li className="sidebar-tab"><button className={this.props.activeContent == "manage-services" ? "active sidebar-option" : "sidebar-option"} id="manage-services-button" name="manage-services" type="button" onClick={this.handleClick}>Manage Services</button></li>
                    <li className="sidebar-tab"><button className={this.props.activeContent == "admin-settings" ? "active sidebar-option" : "sidebar-option"} id="admin-settings-button" name="admin-settings" type="button" onClick={this.handleClick}>Admin Settings</button></li>
                </ul>
            </div>
        );
    }
}


class DeployService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repoUrl: '',
            repoBranch: 'main',
            useRepoDeployConfig: false,
            useRepoServiceConfig: false,
            deployConfigPath: '',
            serviceConfigPath: '',
            appName: '',
            imageName: '',
            netProtocol: 'TCP',
            containerPort: '',
            openToNetwork: false,
            nodePort: '',
            replicas: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = (target.type === 'checkbox' ? target.checked : target.value);
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        let url = window.location.href + 'deploy';
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        try {
            let res = await fetch(url, requestOptions);
            let body = await res.json();
            if (!res.ok) {
                throw new Error("Status code " + res.status.toString() + " (" + res.statusText + ")\n" + JSON.stringify(body));
            } else {
                alert("Deployment created!")
            }
            //window.location.reload(true);
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        let deployConfigGen;
        let serviceConfigGen;

        if (!this.state.useRepoDeployConfig) {
            deployConfigGen = (
                <div>
                    <label htmlFor="appName">Application Name:</label>
                    <input type="text" id="app-name" name="appName" value={this.state.appName} onChange={this.handleChange} /><br/>
                    <label htmlFor="imageName">Image Name (leave blank to use the same name):</label>
                    <input type="text" id="image-name" name="imageName" value={this.state.imageName} onChange={this.handleChange} /><br/>
                    <label htmlFor="replicas">Number of containers to build:</label>
                    <input type="number" id="replicas" name="replicas" value={this.state.replicas} min="1" max="8" onChange={this.handleChange} />
                </div>
            );
        } else {
            deployConfigGen = (
                <div>
                    <label htmlFor="deployConfigPath">Deployment Config Path:</label>
                    <input type="text" id="deploy-config-path" name="deployConfigPath" value={this.state.deployConfigPath} placeholder="kaas.deploy.yaml" onChange={this.handleChange} />
                </div>
            );
        }

        if (!this.state.useRepoServiceConfig) {
            let appConfigGen;
            let networkConfigGen;

            if (this.state.useRepoDeployConfig) {
                appConfigGen = (
                    <div>
                        <label htmlFor="appName">Application Name:</label>
                        <input type="text" id="app-name" name="appName" value={this.state.appName} onChange={this.handleChange} /><br/>
                    </div>
                );

            } else {
                appConfigGen = <div></div>;
            }


            if (this.state.openToNetwork) {
                networkConfigGen = (
                    <div>
                        <label htmlFor="nodePort">Network Port (must be between 30000-32767, leave blank for random):</label>
                        <input type="text" id="node-port" name="nodePort" value={this.state.nodePort} onChange={this.handleChange} />
                    </div>
                );
            } else {
                networkConfigGen = <div></div>;
            }

            serviceConfigGen = (
                <div>
                    {appConfigGen}
                    <label htmlFor="netProtocol">Port Protocol:</label>
                    <select id="net-protocol" name="netProtocol" value={this.state.netProtocol} onChange={this.handleChange}>
                        <option value="TCP">TCP</option>
                        <option value="UDP">UDP</option>
                        <option value="SCTP">SCTP</option>
                    </select><br/>
                    <label htmlFor="containerPort">Container Port:</label>
                    <input type="text" id="container-port" name="containerPort" value={this.state.containerPort} onChange={this.handleChange} /><br/>
                    <input type="checkbox" id="open-to-network" name="openToNetwork" checked={this.state.openToNetwork} onChange={this.handleChange} />
                    <label htmlFor="openToNetwork">Open to port on network</label><br />
                    {networkConfigGen}
                </div>
            );
        } else {
            serviceConfigGen = (
                <div>
                    <label htmlFor="serviceConfigPath">Service Config Path:</label>
                    <input type="text" id="service-config-path" name="serviceConfigPath" value={this.state.serviceConfigPath} placeholder="kaas.deploy.yaml" onChange={this.handleChange} />
                </div>
            );
        }

        return (
            <div className="content-wrapper" id="deploy-service">
                <h2>Deploy New Service</h2>
                <form id="deploy-form" onSubmit={this.handleSubmit}>
                    <h3 className="form-header">Image</h3>
                    <label htmlFor="repoUrl">GitHub Repository URL:</label>
                    <input type="text" id="repo-url" name="repoUrl" value={this.state.repoUrl} onChange={this.handleChange}/><br/>
                    <label htmlFor="repoBranch">Repository Branch:</label>
                    <input type="text" id="repo-branch" name="repoBranch" value={this.state.repoBranch} onChange={this.handleChange} /><br/>
                    <h3 className="form-header">Deployment Configuration</h3>
                    <input type="checkbox" id="use-repo-deploy-config" name="useRepoDeployConfig" checked={this.state.useRepoDeployConfig} onChange={this.handleChange} />
                    <label htmlFor="useRepoConfig">Use repository K8s deployment config file</label><br/>
                    {deployConfigGen}
                    <h3 className="form-header">Service Configuration</h3>
                    <input type="checkbox" id="use-repo-service-config" name="useRepoServiceConfig" checked={this.state.useRepoServiceConfig} onChange={this.handleChange}/>
                    <label htmlFor="useRepoConfig">Use repository K8s service config file</label><br/>
                    {serviceConfigGen}
                    <input type="submit" id="deploy-form-submit" value="Deploy" />
                </form>
            </div>
        );
    }
}


class ClusterManagement extends React.Component {
    render() {
        return (
            <div className="content-wrapper" id="manage-services">
                <h2>Manage services</h2>
                <p>Manage services not enabled yet</p>
            </div>
        );
    }
}


class AdminSettings extends React.Component {
    render() {
        return (
            <div className="content-wrapper" id="admin-settings">
                <h2>Admin Settings</h2>
                <p>Admin settings not enabled yet</p>
            </div>
        );
    }
}


class Error404Page extends React.Component {
    render() {
        return <p>Error 404, unknown destination</p>
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeContent: "deploy-service"};
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleContentChange(e) {
        this.setState({activeContent: e.target.name});
    }

    render() {
        let content;
        if (this.state.activeContent == "deploy-service") {
            content = <DeployService />
        } else if (this.state.activeContent == "manage-services") {
            content = <ClusterManagement />
        } else if (this.state.activeContent == "admin-settings") {
            content = <AdminSettings />
        } else {
            content = <Error404Page />
        }

        return (
            <div id="app">
                <Header />
                <div className="below-header">
                    <Sidebar activeContent={this.state.activeContent} onContentChange={this.handleContentChange} />
                    <div className="content">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}


const domContainer = document.querySelector('#root');
ReactDOM.render(
    <App />,
    domContainer
);
