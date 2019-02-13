export default class Card {
  name: string;
  img: string;
  controlledBy: string;
  domain: string;
  type: string;
  cost: number;
  attack: number;
  hull: number;
  currentHull: number;
  movement: boolean;
  hasMoved: boolean;
  rules: string;
  canTarget: boolean;
  globalEffect: () => void;
  oneTimeEffect: () => void;

  constructor({
    name,
    img,
    domain,
    type,
    cost,
    attack,
    hull,
    movement,
    rules,
    canTarget,
    globalEffect,
    oneTimeEffect
  }: {
    name: string;
    img: string;
    domain: string;
    type: string;
    cost: number;
    attack: number;
    hull: number;
    movement: boolean;
    rules: string;
    canTarget: boolean;
    globalEffect: () => void;
    oneTimeEffect: () => void;
  }) {
    this.name = name;
    this.img = img;
    this.domain = domain;
    this.type = type;
    this.cost = cost;
    this.attack = attack;
    this.hull = hull;
    this.currentHull = hull;
    this.movement = movement;
    this.hasMoved = false;
    this.rules = rules;
    this.canTarget = canTarget;
    this.globalEffect = globalEffect;
    this.oneTimeEffect = oneTimeEffect;
  }

  dealDamage(): number {
    return this.attack;
  }

  receiveDamageFrom(dmg: number): boolean {
    this.currentHull -= dmg;
    return this.isDestroyed();
  }

  isDestroyed(): boolean {
    if (this.currentHull <= 0) return false;
    else return true;
  }
}
