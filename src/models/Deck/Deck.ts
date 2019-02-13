import Card from "../Card/Card";

export default class Deck {
  Cards: Card[];

  constructor(Deck: Card[]) {
    this.Cards = Deck;
  }

  shuffle(): void {
    let deck = this.Cards.map(card =>
      Object.assign(Object.create(Object.getPrototypeOf(new Card(card))), card)
    );
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    this.Cards = deck;
  }

  draw(): Card {
    return this.Cards.shift();
  }
}
