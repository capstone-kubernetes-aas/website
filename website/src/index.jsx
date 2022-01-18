
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
    render() {
        return (
            <div className="content-wrapper" id="deploy-service">
                <h2>Deploy New Service</h2>
                <p>Deploy new service not enabled yet</p>
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
