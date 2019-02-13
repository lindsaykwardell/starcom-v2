import Card from "../../models/Card/Card";

export default [
  new Card({
    name: "Command Station",
    img: "",
    domain: "Industry",
    type: "Station",
    cost: 6,
    attack: 1,
    hull: 4,
    movement: false,
    rules: "Ships you control in this system get +1 attack",
    canTarget: true,
    globalEffect: () => {
      // Game.System(0).allShipsControlledBy(player).get({1, "attack"});
      // I'll need to write this to be able to call that.
    },
    oneTimeEffect: null
  })
]
