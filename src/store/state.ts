export interface IState {
  playerName: string;
  gameName: string;
  gridSize: number
  gameMode: string;
  isHostingGame: boolean;
  isGameRunning: boolean;
  connectedToGame: string | null;
}

export const initialState:IState = {
  playerName: localStorage.getItem("PlayerName") || "New Player",
  gameName: localStorage.getItem("GameName") || "Lyre War",
  gridSize: 3,
  gameMode: "hotseat",
  isHostingGame: false,
  isGameRunning: false,
  connectedToGame: null
};