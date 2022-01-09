
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
                    <h1>[Name Pending]</h1>
                </div>
                <div className="logout">
                    <LogoutButton />
                </div>
            </div>
        );
    }
}


class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <ul className="sidebar-list">
                    <li className="sidebar-tab"><button className="sidebar-option" id="deploy-service" name="deploy-service" type="button">Deploy New Service</button></li>
                    <li className="sidebar-tab"><button className="sidebar-option" id="manage-services" name="manage-services" type="button">Manage Services</button></li>
                    <li className="sidebar-tab"><button className="sidebar-option" id="admin-settings" name="admin-settings" type="button">Admin Settings</button></li>
                </ul>
            </div>
        );
    }
}

class DeployService extends React.Component {
    render() {
        return <p>Deploy new service not enabled yet</p>;
    }
}

class ClusterManagement extends React.Component {
    render() {
        return <p>Manage services not enabled yet</p>;
    }
}

class AdminSettings extends React.Component {
    render() {
        return <p>Admin settings not enabled yet</p>;
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <Sidebar /><DeployService />
            </div>
        );

    }

}

class Page extends React.Component {
    render() {
        return (<div id="page"><Header /><Content /></div>);
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(
    <Page />,
    domContainer
);