import React, { Component, CSSProperties } from "react";

import Router from "./Router";
import routes from "../config/routes";

export default class Frame extends Component {
  state = {
    activeTransition: false
  };

  toggleTransitionHandler = () => {
    return new Promise(resolve => {
      this.setState({ activeTransition: !this.state.activeTransition });
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  render() {
    const frame:CSSProperties = {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "#333",
      opacity: this.state.activeTransition ? 0 : 1,
      transition: "0.5s",
      zIndex: 1
    };

    return (
      <div style={frame}>
        <Router
          routes={routes}
          beforeOpenRoute={this.toggleTransitionHandler}
          afterOpenRoute={this.toggleTransitionHandler}
          toggleTransition={this.toggleTransitionHandler}
        />
      </div>
    );
  }
}
