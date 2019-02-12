import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Container,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import firebase from "../../config/firebase";
import {IState} from "../../store/state";
import Menu from "../../components/Menu/Menu";

import bg from "../../img/bg.jpg";
import classes from "./lobby.module.css";
import { Dispatch } from "redux";

const mapStateToProps = (state:IState) => {
  return {
    gameName: state.gameName,
    gridSize: state.gridSize,
    gameMode: state.gameMode,
    isHostingGame: state.isHostingGame,
    connectedToGame: state.connectedToGame
  };
};

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    setGameName: (e:ChangeEvent<HTMLInputElement>) => dispatch({ type: "SET_GAME_NAME", name: e.target.value }),
    setGameMode: (mode:string) => dispatch({ type: "SET_GAME_MODE", mode }),
    hostGame: (id:string) => dispatch({ type: "HOST_GAME", gameID: id }),
    joinGame: (id:string) => dispatch({ type: "JOIN_GAME", gameID: id }),
    setGridSize: (e:ChangeEvent<HTMLInputElement>) => dispatch({ type: "SET_GRID_SIZE", size: e.target.value })
  };
};

interface State {
  availableGames: any[];
  selectedGame: string;
  menuOption: string;
}

interface Props {
  gameName: string;
  gridSize: number;
  gameMode: string;
  isHostingGame: boolean;
  connectedToGame: string;
  setGameName: (e: ChangeEvent<HTMLInputElement>) => void;
  setGameMode: (mode: string) => void;
  hostGame: (id:string) => void;
  joinGame: (id:string) => void;
  setGridSize: (e:ChangeEvent<HTMLInputElement>) => void;
  link: (ref:string) => void;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Lobby extends Component<Props, State> {
    // constructor() {
    //   super({});

    //   this.state = {
    //     availableGames: [],
    //     selectedGame: "",
    //     menuOption: "new"
    //   };

    //   this.listener = firebase
    //     .firestore()
    //     .collection("currentGames")
    //     .where("playerCount", "==", 1)
    //     .onSnapshot(docs => {
    //       const availableGames:any = [];
    //       docs.forEach(doc => {
    //         const game = doc.data();
    //         game.ID = doc.id;
    //         availableGames.push(game);
    //       });
    //       this.setState({ availableGames });
    //     });
    // }

    state:State = {
      availableGames: [],
      selectedGame: "",
      menuOption: "new"
    };

    listener = firebase
      .firestore()
      .collection("currentGames")
      .where("playerCount", "==", 1)
      .onSnapshot(docs => {
        const availableGames: any = [];
        docs.forEach(doc => {
          const game = doc.data();
          game.ID = doc.id;
          availableGames.push(game);
        });
        this.setState({ availableGames });
      });

    componentWillUnmount() {
      this.listener();
    }

    setMenuOption = (menuOption:string) => {
      this.setState({ menuOption });
    };

    setGameModeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      this.props.setGameMode(e.target.value);
    };

    selectGameHandler = (gameID:string) => {
      this.props.setGameMode("online");
      console.log(gameID);
      this.setState({ selectedGame: gameID });
    };

    hostGameHandler = () => {
      if (this.props.gameMode === "online") {
        firebase
          .firestore()
          .collection("currentGames")
          .add({
            name: this.props.gameName,
            playerCount: 1
          })
          .then(docRef => {
            this.props.hostGame(docRef.id);
            this.props.link("Game");
          });
      } else {
        this.props.hostGame(null);
        this.props.link("Game");
      }
    };

    joinGameHandler = () => {
      if (this.props.gameMode === "online") {
        firebase
          .firestore()
          .collection("currentGames")
          .doc(this.state.selectedGame)
          .set(
            {
              playerCount: 2
            },
            { merge: true }
          )
          .then(() => {
            this.props.joinGame(this.state.selectedGame);
            this.props.link("Game");
          });
      }
    };

    onLogoutHandler = () => {
      firebase.auth().signOut();
    };

    render() {
      const availableGames = this.state.availableGames.map((game, index) => {
        const isSelected =
          game.ID === this.state.selectedGame
            ? classes.selectedGame
            : classes.availableGame;

        return (
          <div
            key={index}
            className={isSelected}
            onClick={() => this.selectGameHandler(game.ID)}
          >
            {game.name}
          </div>
        );
      });

      return (
        <div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,.75)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                color: "white",
                position: "absolute",
                top: "15px",
                right: "15px"
              }}
            >
              {firebase.auth().currentUser.displayName}
              <Button
                className="ml-3"
                color="light"
                onClick={() => this.props.link("Settings")}
              >
                Settings
              </Button>
              <Button
                className="ml-3"
                color="warning"
                onClick={() => this.props.link("MapMaker")}
              >
                Map Maker
              </Button>
              <Button
                className="ml-3"
                color="dark"
                onClick={this.onLogoutHandler}
              >
                Log Out
              </Button>
            </div>
            <Container style={{ marginTop: "60px" }}>
              <Row>
                <Col
                  className={
                    this.state.menuOption === "new" ? "" : classes.inactive
                  }
                >
                  <Button
                    color="primary"
                    className={classes.enterGame}
                    onClick={this.hostGameHandler}
                  >
                    <h1>
                      {this.props.gameMode === "hotseat"
                        ? "New Game"
                        : "Host Game"}
                    </h1>
                  </Button>
                </Col>
                <Col
                  className={
                    this.state.menuOption === "join" ? "" : classes.inactive
                  }
                >
                  <Button
                    color="info"
                    className={classes.enterGame}
                    onClick={this.joinGameHandler}
                  >
                    <h1>Join Game</h1>
                  </Button>
                </Col>
              </Row>
            </Container>
            <Container className="p-2">
              <Row>
                <Col
                  className={
                    this.state.menuOption === "new" ? "" : classes.inactive
                  }
                >
                  <div className={classes.box}>
                    <h5>Settings</h5>
                    <hr />
                    <FormGroup>
                      <Label>Game Mode</Label>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onChange={this.setGameModeHandler}
                        value={this.props.gameMode}
                      >
                        <option value="hotseat">Hotseat</option>
                        <option value="online">Online</option>
                        {/*<option value="computer">Vs. AI</option>*/}
                      </Input>
                    </FormGroup>
                    {this.props.gameMode === "online" ? (
                      <FormGroup>
                        <Label for="gameName">Game Name</Label>
                        <Input
                          id="gameName"
                          type="text"
                          value={this.props.gameName}
                          onChange={this.props.setGameName}
                        />
                      </FormGroup>
                    ) : (
                      ""
                    )}
                    <FormGroup>
                      <Label>Grid Size</Label>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={this.props.gridSize}
                        onChange={this.props.setGridSize}
                      >
                        <option value="3">3 x 3</option>
                        <option value="4">4 x 4</option>
                        <option value="5">5 x 5</option>
                      </Input>
                    </FormGroup>
                  </div>
                </Col>
                <Col
                  className={
                    this.state.menuOption === "join" ? "" : classes.inactive
                  }
                >
                  <div className={classes.box}>
                    <h5>Current Games:</h5>
                    <hr />
                    {availableGames}
                  </div>
                </Col>
              </Row>
            </Container>
            <Menu>
              <Row>
                <Col>
                  <Button
                    color="dark"
                    style={{ width: "100%" }}
                    onClick={() => this.setMenuOption("new")}
                  >
                    New
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="dark"
                    style={{ width: "100%" }}
                    onClick={() => this.setMenuOption("join")}
                  >
                    Join
                  </Button>
                </Col>
              </Row>
            </Menu>
          </div>
        </div>
      );
    }
  }
);
