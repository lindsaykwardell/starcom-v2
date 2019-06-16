import Card from "../Card/Card";

export default class System {
  permanents: Card[];
  controlledBy: string;
  canBuildShipsHere: false;
  allShipsControlledBy: (
    player: string
  ) => {
    receive: ({ value, stat }: { value: number; stat: string }) => void;
  };
  constructor() {
    this.allShipsControlledBy = (player: string) => {
      const list: number[] = [];

      this.permanents.forEach((card, index) => {
        if (
          card.controlledBy === player &&
          ["Fighter", "Frigate", "Cruiser", "Battleship"].indexOf(card.type) >
            -1
        )
          list.push(index);
      });

      const methods = {
        receive: ({ value, stat }: { value: number; stat: string }) => {
          list.forEach(i => {
            switch (stat) {
              case "attack":
                this.permanents[i].attack += value;
                break;
            }
          });
        }
      };

      return methods;
    };
  }
}
