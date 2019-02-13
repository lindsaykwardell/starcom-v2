import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../config/firebase";
import audioControl from "../config/audioControl";
import { Dispatch } from "redux";
import { IRoute } from "../config/routes";

interface Props {
  updateName: (name: string) => void;
  routes: { [key: string]: IRoute };
  beforeOpenRoute: () => Promise<{}>;
  afterOpenRoute: () => Promise<{}>;
  toggleTransition: () => Promise<{}>;
}

interface State {
  openPage: any;
  prevProps: any;
}

class Router extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // audioControl.selectSong("theme:0");
    // audioControl.fadeIn();

    document.addEventListener("click", this.musicPlay);

    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.updateName(firebase.auth().currentUser.displayName);
          this.link("Lobby");
        } else {
          this.link("Login");
        }
      });
    }, 2000);
  }

  state: State = {
    openPage: "Splash",
    prevProps: null
  };

  musicPlay = () => {
    if (audioControl.audio.paused) {
      // audioControl.selectSong("theme:0");
      // audioControl.fadeIn();
    }

    document.removeEventListener("click", this.musicPlay);
  };

  beforeLeaveHandler = () => {
    return new Promise((resolve, reject) => {
      if (this.props.routes[this.state.openPage].beforeLeave !== undefined) {
        const res = this.props.routes[this.state.openPage].beforeLeave();
        if (res === false) {
          reject();
        }
        resolve();
      } else {
        resolve();
      }
    });
  };

  beforeEnterHandler = (target: any): Promise<string | boolean> => {
    return new Promise((resolve, reject) => {
      if (this.props.routes[target].beforeEnter !== undefined) {
        const res = this.props.routes[target].beforeEnter();
        if (res === false) {
          reject();
        }
        resolve(res);
      } else {
        resolve();
      }
    });
  };

  link = (target: string, prevProps?: any) => {
    this.beforeLeaveHandler()
      .then(() => {
        return this.beforeEnterHandler(target);
      })
      .then(updatedTarget => {
        if (typeof updatedTarget === "string") {
          target = updatedTarget;
        }
        if (this.props.beforeOpenRoute !== undefined) {
          return this.props.beforeOpenRoute();
        } else return true;
      })
      .then(() => {
        this.setState({ openPage: target, prevProps }, () => {
          if (this.props.afterOpenRoute !== undefined) {
            this.props.afterOpenRoute();
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const OpenPage = this.props.routes[this.state.openPage];

    return (
      <OpenPage.component
        toggleTransition={this.props.toggleTransition}
        prevProps={this.state.prevProps}
        link={this.link}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateName: (name: string) =>
      dispatch({ type: "UPDATE_PLAYER_NAME", value: name })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Router);
