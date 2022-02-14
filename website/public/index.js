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
      replicas: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
      headers: {
        'Content-Type': 'application/json'
      },
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
      configGen = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        for: "appName"
      }, "Application Name:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "app-name",
        name: "appName",
        value: this.state.appName,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "containerName"
      }, "Container Name:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "container-name",
        name: "containerName",
        value: this.state.containerName,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "containerImage"
      }, "Container Image:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "container-image",
        name: "containerImage",
        value: this.state.containerImage,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "containerPort"
      }, "Container Port:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "container-port",
        name: "containerPort",
        value: this.state.containerPort,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "servicePort"
      }, "Service Port:"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "service-port",
        name: "servicePort",
        value: this.state.servicePort,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "netProtocol"
      }, "Port Protocol:"), /*#__PURE__*/React.createElement("select", {
        id: "net-protocol",
        name: "netProtocol",
        value: this.state.netProtocol,
        onChange: this.handleChange
      }, /*#__PURE__*/React.createElement("option", {
        value: "TCP"
      }, "TCP"), /*#__PURE__*/React.createElement("option", {
        value: "UDP"
      }, "UDP"), /*#__PURE__*/React.createElement("option", {
        value: "SCTP"
      }, "SCTP")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "replicas"
      }, "Number of containers to build:"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "replicas",
        name: "replicas",
        value: this.state.replicas,
        min: "1",
        max: "8",
        onChange: this.handleChange
      }));
    } else {
      configGen = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        for: "deployConfigPath"
      }, "Deployment Config Path"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "deploy-config-path",
        name: "deployConfigPath",
        value: this.state.deployConfigPath,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "deployServicePath"
      }, "Service Config Path"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "deploy-service-path",
        name: "deployServicePath",
        value: this.state.deployServicePath,
        onChange: this.handleChange
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "deploy-service"
    }, /*#__PURE__*/React.createElement("h2", null, "Deploy New Service"), /*#__PURE__*/React.createElement("form", {
      id: "deploy-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("label", {
      for: "repoUrl"
    }, "GitHub Repository URL:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "repo-url",
      name: "repoUrl",
      value: this.state.repoUrl,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      for: "repoBranch"
    }, "Repository Branch:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "repo-branch",
      name: "repoBranch",
      value: this.state.repoBranch,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "use-config",
      name: "useRepoConfig",
      checked: this.state.useRepoConfig,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("label", {
      for: "useRepoConfig"
    }, "Use repository K8s configuration"), /*#__PURE__*/React.createElement("br", null), configGen, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      id: "deploy-form-submit",
      value: "Deploy"
    })));
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