import firebase from "../config/firebase";
import { initialState, IState } from "./state";

const reducer = (
  state: IState = initialState,
  action: {
    type: string;
    value: string;
    name: string;
    gameID: string;
    mode: string;
    size: number;
  }
) => {
  switch (action.type) {
    case "UPDATE_PLAYER_NAME":
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: action.value,
          photoURL: null
        });
      localStorage.setItem("PlayerName", action.value);
      return {
        ...state,
        playerName: action.value
      };
    case "SET_GAME_NAME":
      localStorage.setItem("GameName", action.name);
      return {
        ...state,
        gameName: action.name
      };
    case "SET_GAME_MODE":
      return {
        ...state,
        gameMode: action.mode
      };
    case "HOST_GAME":
      return {
        ...state,
        isHostingGame: true,
        isGameRunning: true,
        connectedToGame: action.gameID
      };
    case "JOIN_GAME":
      return {
        ...state,
        isHostingGame: false,
        isGameRunning: true,
        connectedToGame: action.gameID
      };
    case "END_GAME":
      return {
        ...state,
        isHostingGame: false,
        isGameRunning: false,
        connectedToGame: null
      };
    case "SET_GRID_SIZE":
      return {
        ...state,
        gridSize: action.size
      };
    default:
      return state;
  }
};

export default reducer;
