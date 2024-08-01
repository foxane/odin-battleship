import Gameboard from './gameboard';

export default class Player {
  constructor(type) {
    if (type === 'human') {
      this.isHuman = true;
    } else {
      this.isHuman = false;
    }

    this.gameboard = new Gameboard();
  }

  attack() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}
