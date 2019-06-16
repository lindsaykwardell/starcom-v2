import Deck from "../Deck/Deck";
import Decks from "../../config/cards";
import System from "../System/System";

export default class Game {
  Discard: Deck;
  Decks: {
    Industry: Deck;
    Politics: Deck;
    Science: Deck;
  };
  Systems: System[];
  constructor() {
    this.Discard = new Deck([]);
    this.Decks.Industry = Decks.Industry;
    this.Systems = [];
    for (let index = 0; index < 9; index++) {
      this.Systems.push(new System());
    }

    this.Systems[0]
      .allShipsControlledBy("")
      .receive({ value: 1, stat: "attack" });
  }
}
