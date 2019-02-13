import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { IState } from "../../store/state";
import { Dispatch } from "redux";

import { Row, Col, Container } from "reactstrap";
import firebase from "../../config/firebase";

import Nav from "./Nav/Nav";
import StartGameButton from "./StartGameButton/StartGameButton";
import Settings from "./Settings/Settings";

import bg from "../../img/bg.jpg";
import classes from "./lobby.module.css";

interface State {
  availableGames: any[];
  selectedGame: string;
}

interface Props {
  gameName: string;
  gridSize: number;
  gameMode: string;
  isHostingGame: boolean;
  connectedToGame: string;
  setGameName: (e: ChangeEvent<HTMLInputElement>) => void;
  setGameMode: (mode: string) => void;
  hostGame: (id: string) => void;
  joinGame: (id: string) => void;
  setGridSize: (e: ChangeEvent<HTMLInputElement>) => void;
  link: (ref: string) => void;
}

class Lobby extends Component<Props, State> {
  state: State = {
    availableGames: [],
    selectedGame: ""
  };

  listener = firebase
    .firestore()
    .collection("currentGames")
    .where("playerCount", "==", 1)
    .onSnapshot(docs => {
      const availableGames: any = [];
      docs.forEach(doc => {
        console.log(doc.data());
        const game = doc.data();
        game.ID = doc.id;
        availableGames.push(game);
      });
      this.setState({ availableGames });
    });

  componentWillUnmount() {
    this.listener();
  }

  setGameModeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.setGameMode(e.target.value);
  };

  selectGameHandler = (gameID: string) => {
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
          <Nav
            link={this.props.link}
            logout={() => firebase.auth().signOut()}
          />
          <Container style={{ marginTop: "60px" }}>
            <Row>
              <StartGameButton
                color="primary"
                className={classes.enterGame}
                onClick={this.hostGameHandler}
              >
                <h1>
                  {this.props.gameMode === "hotseat" ? "New Game" : "Host Game"}
                </h1>
              </StartGameButton>
              <StartGameButton
                color="info"
                className={classes.enterGame}
                onClick={this.hostGameHandler}
              >
                <h1>Join Game</h1>
              </StartGameButton>
            </Row>
          </Container>
          <Container className="p-2">
            <Row>
              <Settings
                className={classes.box}
                gameMode={this.props.gameMode}
                setGameMode={this.setGameModeHandler}
                gameName={this.props.gameName}
                setGameName={this.props.setGameName}
                gridSize={this.props.gridSize}
                setGridSize={this.props.setGridSize}
              />
              <Col>
                <div className={classes.box}>
                  <h5>Current Games:</h5>
                  <hr />
                  {availableGames}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    gameName: state.gameName,
    gridSize: state.gridSize,
    gameMode: state.gameMode,
    isHostingGame: state.isHostingGame,
    connectedToGame: state.connectedToGame
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setGameName: (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_GAME_NAME", name: e.target.value }),
    setGameMode: (mode: string) => dispatch({ type: "SET_GAME_MODE", mode }),
    hostGame: (id: string) => dispatch({ type: "HOST_GAME", gameID: id }),
    joinGame: (id: string) => dispatch({ type: "JOIN_GAME", gameID: id }),
    setGridSize: (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "SET_GRID_SIZE", size: e.target.value })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
