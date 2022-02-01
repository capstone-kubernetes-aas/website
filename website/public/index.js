class LogoutButton extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("button", {
      id: "logout-button",
      name: "logout",
      type: "button"
    }, "Logout");
  }

}

class Header extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "title-text"
    }, "[Name Pending]")), /*#__PURE__*/React.createElement("div", {
      className: "logout"
    }, /*#__PURE__*/React.createElement(LogoutButton, null)));
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
    return /*#__PURE__*/React.createElement("div", {
      className: "sidebar"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "sidebar-list"
    }, /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: this.props.activeContent == "deploy-service" ? "active sidebar-option" : "sidebar-option",
      id: "deploy-service-button",
      name: "deploy-service",
      type: "button",
      onClick: this.handleClick
    }, "Deploy New Service")), /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: this.props.activeContent == "manage-services" ? "active sidebar-option" : "sidebar-option",
      id: "manage-services-button",
      name: "manage-services",
      type: "button",
      onClick: this.handleClick
    }, "Manage Services")), /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: this.props.activeContent == "admin-settings" ? "active sidebar-option" : "sidebar-option",
      id: "admin-settings-button",
      name: "admin-settings",
      type: "button",
      onClick: this.handleClick
    }, "Admin Settings"))));
  }

}

class DeployService extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "deploy-service"
    }, /*#__PURE__*/React.createElement("h2", null, "Deploy New Service"), /*#__PURE__*/React.createElement("p", null, "Deploy new service not enabled yet"));
  }

}

class ClusterManagement extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "manage-services"
    }, /*#__PURE__*/React.createElement("h2", null, "Manage services"), /*#__PURE__*/React.createElement("p", null, "Manage services not enabled yet"));
  }

}

class AdminSettings extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "admin-settings"
    }, /*#__PURE__*/React.createElement("h2", null, "Admin Settings"), /*#__PURE__*/React.createElement("p", null, "Admin settings not enabled yet"));
  }

}

class Error404Page extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("p", null, "Error 404, unknown destination");
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: "deploy-service"
    };
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleContentChange(e) {
    this.setState({
      activeContent: e.target.name
    });
  }

  render() {
    let content;

    if (this.state.activeContent == "deploy-service") {
      content = /*#__PURE__*/React.createElement(DeployService, null);
    } else if (this.state.activeContent == "manage-services") {
      content = /*#__PURE__*/React.createElement(ClusterManagement, null);
    } else if (this.state.activeContent == "admin-settings") {
      content = /*#__PURE__*/React.createElement(AdminSettings, null);
    } else {
      content = /*#__PURE__*/React.createElement(Error404Page, null);
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "app"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
      className: "below-header"
    }, /*#__PURE__*/React.createElement(Sidebar, {
      activeContent: this.state.activeContent,
      onContentChange: this.handleContentChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, content)));
  }

}

const domContainer = document.querySelector('#root');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), domContainer);