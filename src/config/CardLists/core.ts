import Game from "../../models/Game/Game";
import Card from "../../models/Card/Card";

export default [
  new Card({
    name: "Command Station",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Station",
    cost: 6,
    attack: 1,
    hull: 4,
    movement: false,
    rules: "Ships you control in this system get +1 attack",
    canTarget: true,
    globalEffect(Game: Game) {
      Game.Systems[0]
        .allShipsControlledBy(this.controlledBy)
        .receive({ value: 1, stat: "attack" });
      // Game.System(0).allShipsControlledBy(player).get({1, "attack"});
      // I'll need to write this to be able to call that.
    },
    oneTimeEffect: null
  }),
  new Card({
    name: "Shipyard",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Station",
    cost: 4,
    attack: 1,
    hull: 4,
    movement: false,
    rules: "You may build ships in this system.",
    canTarget: true,
    globalEffect: () => {
      // Game.System(0).canBuildShipsHere = true;
    },
    oneTimeEffect: null
  }),
  new Card({
    name: "Missile Platform",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Station",
    cost: 3,
    attack: 3,
    hull: 6,
    movement: false,
    rules: "",
    canTarget: true,
    globalEffect: null,
    oneTimeEffect: null
  }),
  new Card({
    name: "Harvest The Remains",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Command",
    cost: 3,
    attack: 0,
    hull: 0,
    movement: false,
    rules: "Return a card from the discard pile to your hand.",
    canTarget: true,
    globalEffect: null,
    oneTimeEffect: () => {
      // Game.Discard.returnCardToHand(player)
    }
  }),
  new Card({
    name: "Evasion",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Maneuver",
    cost: 2,
    attack: 0,
    hull: 0,
    movement: false,
    rules: "Prevent all damage that would be dealt to target ship this turn.",
    canTarget: true,
    globalEffect: null,
    oneTimeEffect: () => {
      // Game.System(0).Ship(n).preventAllDamageThisTurn();
    }
  }),
  new Card({
    name: "Barrage",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Maneuver",
    cost: 2,
    attack: 2,
    hull: 0,
    movement: false,
    rules: "Deal 2 damage to target ship or station.",
    canTarget: true,
    globalEffect: null,
    oneTimeEffect: () => {
      // Game.System(0).ShipOrStation(n).directDamage(this.attack)
    }
  }),
  new Card({
    name: "Discipline",
    img: "",
    controlledBy: null,
    domain: "Industry",
    type: "Maneuver",
    cost: 2,
    attack: 0,
    hull: 0,
    movement: false,
    rules: "Prevent all damage that would be dealt to target ship this turn.",
    canTarget: true,
    globalEffect: null,
    oneTimeEffect: () => {
      // Game.System(0).Ship[n].preventAllDamageThisTurn();
    }
  })
];
