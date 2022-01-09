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
    }, /*#__PURE__*/React.createElement("h1", null, "[Name Pending]")), /*#__PURE__*/React.createElement("div", {
      className: "logout"
    }, /*#__PURE__*/React.createElement(LogoutButton, null)));
  }

}

class Sidebar extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "sidebar"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "sidebar-list"
    }, /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: "sidebar-option",
      id: "deploy-service",
      name: "deploy-service",
      type: "button"
    }, "Deploy New Service")), /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: "sidebar-option",
      id: "manage-services",
      name: "manage-services",
      type: "button"
    }, "Manage Services")), /*#__PURE__*/React.createElement("li", {
      className: "sidebar-tab"
    }, /*#__PURE__*/React.createElement("button", {
      className: "sidebar-option",
      id: "admin-settings",
      name: "admin-settings",
      type: "button"
    }, "Admin Settings"))));
  }

}

class DeployService extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("p", null, "Deploy new service not enabled yet");
  }

}

class ClusterManagement extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("p", null, "Manage services not enabled yet");
  }

}

class AdminSettings extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("p", null, "Admin settings not enabled yet");
  }

}

class Content extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement(DeployService, null));
  }

}

class Page extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "page"
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Content, null));
  }

}

const domContainer = document.querySelector('#root');
ReactDOM.render( /*#__PURE__*/React.createElement(Page, null), domContainer);