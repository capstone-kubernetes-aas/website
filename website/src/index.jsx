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
            repoBranch: '',
            useRepoConfig: false,
            deployConfigPath: '',
            serviceConfigPath: '',
            appName: '',
            //appTier: '',
            //appRole: '',
            containerName: '',
            containerImage: '',
            containerPort: '',
            servicePort: '',
            netProtocol: 'TCP',
            replicas: 1,
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

    handleSubmit(event) {
        event.preventDefault();

        const url = window.location.href + 'deploy/';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        let promise = fetch(url, requestOptions);
        let res_code = promise.status;
        
        if (res_code == 200) {
            window.location.reload(true);
        } else if (res_code == 400 || res_code == 500) {
            alert("Response code " + res_code.toString() + "\n" + promise.json().err.toString());
        } else {
            alert("Unknown response code: " + res_code.toString() + "\n" + JSON.stringify(promise.json()));
        }
    }

    render() {
        let configGen;
        if (!this.state.useRepoConfig) {
            configGen = (
                <div>
                    <label for="appName">Application Name:</label>
                    <input type="text" id="app-name" name="appName" value={this.state.appName} onChange={this.handleChange} /><br/>
                    <label for="containerName">Container Name:</label>
                    <input type="text" id="container-name" name="containerName" value={this.state.containerName} onChange={this.handleChange} /><br/>
                    <label for="containerImage">Container Image:</label>
                    <input type="text" id="container-image" name="containerImage" value={this.state.containerImage} onChange={this.handleChange} /><br/>
                    <label for="containerPort">Container Port:</label>
                    <input type="text" id="container-port" name="containerPort" value={this.state.containerPort} onChange={this.handleChange} /><br/>
                    <label for="servicePort">Service Port:</label>
                    <input type="text" id="service-port" name="servicePort" value={this.state.servicePort} onChange={this.handleChange} /><br/>
                    <label for="netProtocol">Port Protocol:</label>
                    <select id="net-protocol" name="netProtocol" value={this.state.netProtocol} onChange={this.handleChange}>
                        <option value="TCP">TCP</option>
                        <option value="UDP">UDP</option>
                        <option value="SCTP">SCTP</option>
                    </select><br/>
                    <label for="replicas">Number of containers to build:</label>
                    <input type="number" id="replicas" name="replicas" value={this.state.replicas} min="1" max="8" onChange={this.handleChange} />
                </div>
            );
        } else {
            configGen = (
                <div>
                    <label for="deployConfigPath">Deployment Config Path</label>
                    <input type="text" id="deploy-config-path" name="deployConfigPath" value={this.state.deployConfigPath} onChange={this.handleChange} /><br/>
                    <label for="deployServicePath">Service Config Path</label>
                    <input type="text" id="deploy-service-path" name="deployServicePath" value={this.state.deployServicePath} onChange={this.handleChange} />
                </div>
            );
        }

        return (
            <div className="content-wrapper" id="deploy-service">
                <h2>Deploy New Service</h2>
                <form id="deploy-form" onSubmit={this.handleSubmit}>
                    <label for="repoUrl">GitHub Repository URL:</label>
                    <input type="text" id="repo-url" name="repoUrl" value={this.state.repoUrl} onChange={this.handleChange}/><br/>
                    <label for="repoBranch">Repository Branch:</label>
                    <input type="text" id="repo-branch" name="repoBranch" value={this.state.repoBranch} onChange={this.handleChange} /><br/>
                    <input type="checkbox" id="use-config" name="useRepoConfig" checked={this.state.useRepoConfig} onChange={this.handleChange}/>
                    <label for="useRepoConfig">Use repository K8s configuration</label><br/>
                    {configGen}
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
