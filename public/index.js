/*class LogoutButton extends React.Component {
    render() {
        return <button id="logout-button" name="logout" type="button">Logout</button>
    }
}*/
class Header extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "title-text"
    }, "KubePi Pipeline")));
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
    }, "Manage Services"))));
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
      // tempAppName: '',
      imageName: '',
      tempImageName: '',
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name; // if (name == "repoURL") {
    //     newName = value.slice(19, value.length - 5);
    //     this.setState({tempAppName: newName, tempImageName: newName + ":latest"});
    // }

    if (name == "appName") {
      this.setState({
        tempImageName: value + ":latest"
      });
    }

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block"; // if (this.state.appName == '') {
    //     this.setState({appName: this.state.tempAppName});
    // }
    // if (this.state.imageName == '') {
    //     this.setState({imageName: this.state.tempImageName});
    // }

    let url = window.location.href + 'deploy';
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };

    try {
      let res = await fetch(url, requestOptions);
      let body = await res.json();

      if (!res.ok) {
        throw new Error("Status code " + res.status.toString() + " (" + res.statusText + ")\n" + JSON.stringify(body));
      } else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("modal").style.display = "none";
        alert("Deployment created!");
      } //window.location.reload(true);

    } catch (error) {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("modal").style.display = "none";
      alert(error.message);
    }
  }

  render() {
    let deployConfigGen;
    let serviceConfigGen;

    if (!this.state.useRepoDeployConfig) {
      deployConfigGen = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        className: "required-field",
        htmlFor: "appName"
      }, "Application Name "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "app-name",
        name: "appName",
        value: this.state.appName,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "imageName"
      }, "Image Name "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "image-name",
        name: "imageName",
        value: this.state.imageName,
        placeholder: this.state.tempImageName,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "replicas"
      }, "Number of Containers "), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "replicas",
        name: "replicas",
        value: this.state.replicas,
        min: "1",
        max: "8",
        onChange: this.handleChange
      })));
    } else {
      deployConfigGen = /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        className: "required-field",
        htmlFor: "deployConfigPath"
      }, "Deployment Config Path "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "deploy-config-path",
        name: "deployConfigPath",
        value: this.state.deployConfigPath,
        placeholder: "kaas.deploy.yaml",
        onChange: this.handleChange
      }));
    }

    if (!this.state.useRepoServiceConfig) {
      let appConfigGen;
      let networkConfigGen;

      if (this.state.useRepoDeployConfig) {
        appConfigGen = /*#__PURE__*/React.createElement("div", {
          className: "form-input"
        }, /*#__PURE__*/React.createElement("label", {
          className: "required-field",
          htmlFor: "appName"
        }, "Application Name "), /*#__PURE__*/React.createElement("input", {
          type: "text",
          id: "app-name",
          name: "appName",
          value: this.state.appName,
          onChange: this.handleChange
        }));
      } else {
        appConfigGen = /*#__PURE__*/React.createElement("div", null);
      }

      if (this.state.openToNetwork) {
        networkConfigGen = /*#__PURE__*/React.createElement("div", {
          className: "form-input"
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: "nodePort"
        }, "Network Port "), /*#__PURE__*/React.createElement("input", {
          type: "text",
          id: "node-port",
          name: "nodePort",
          placeholder: "30000-32767",
          value: this.state.nodePort,
          onChange: this.handleChange
        }));
      } else {
        networkConfigGen = /*#__PURE__*/React.createElement("div", null);
      }

      serviceConfigGen = /*#__PURE__*/React.createElement("div", null, appConfigGen, /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "netProtocol"
      }, "Port Protocol "), /*#__PURE__*/React.createElement("select", {
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
      }, "SCTP"))), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        className: "required-field",
        htmlFor: "containerPort"
      }, "Container Port "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "container-port",
        name: "containerPort",
        value: this.state.containerPort,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "openToNetwork"
      }, "Open to port on network"), /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        id: "open-to-network",
        name: "openToNetwork",
        checked: this.state.openToNetwork,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("br", null)), networkConfigGen);
    } else {
      serviceConfigGen = /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        className: "required-field",
        htmlFor: "serviceConfigPath"
      }, "Service Config Path "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "service-config-path",
        name: "serviceConfigPath",
        placeholder: "kaas.deploy.yaml",
        value: this.state.serviceConfigPath,
        onChange: this.handleChange
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "deploy-service"
    }, /*#__PURE__*/React.createElement("h2", null, "Deploy New Service"), /*#__PURE__*/React.createElement("p", null, "Selections in red are required, the rest can be left blank to be generated."), /*#__PURE__*/React.createElement("form", {
      id: "deploy-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("h3", {
      className: "form-header"
    }, "Image"), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "required-field",
      htmlFor: "repoUrl"
    }, "GitHub Repository URL "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "repo-url",
      name: "repoUrl",
      value: this.state.repoUrl,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "repoBranch"
    }, "Repository Branch "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "repo-branch",
      name: "repoBranch",
      value: this.state.repoBranch,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("h3", {
      className: "form-header"
    }, "Deployment Configuration"), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "useRepoDeployConfig"
    }, "Use repository K8s deployment config file"), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "use-repo-deploy-config",
      name: "useRepoDeployConfig",
      checked: this.state.useRepoDeployConfig,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null)), deployConfigGen, /*#__PURE__*/React.createElement("h3", {
      className: "form-header"
    }, "Service Configuration"), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "useRepoServiceConfig"
    }, "Use repository K8s service config file"), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: "use-repo-service-config",
      name: "useRepoServiceConfig",
      checked: this.state.useRepoServiceConfig,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement("br", null)), serviceConfigGen, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("input", {
      type: "submit",
      id: "deploy-form-submit",
      value: "Deploy"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "overlay"
    }), /*#__PURE__*/React.createElement("div", {
      id: "modal"
    }, "Deploying Service..."));
  }

}

class ClusterManagement extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper",
      id: "manage-services"
    }, /*#__PURE__*/React.createElement("h2", null, "Manage services"), /*#__PURE__*/React.createElement("a", {
      href: "https://dashboard.capstone.detjens.dev/",
      target: "_blank"
    }, "Connect to dashboard"));
  }

} // class AdminSettings extends React.Component {
//     render() {
//         return (
//             <div className="content-wrapper" id="admin-settings">
//                 <h2>Admin Settings</h2>
//                 <p>Admin settings not enabled yet</p>
//             </div>
//         );
//     }
// }


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
      content = /*#__PURE__*/React.createElement(ClusterManagement, null); // } else if (this.state.activeContent == "admin-settings") {
      //     content = <AdminSettings />
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