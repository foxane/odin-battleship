import Gameboard from './gameboard';

export default class Player {
  boardSize = Gameboard.size;
  constructor(type) {
    if (type === 'human') {
      this.isHuman = true;
    } else {
      this.isHuman = false;
    }

    this.gameboard = new Gameboard();
  }

  computerAttack() {
    return [
      Math.floor(Math.random() * this.boardSize),
      Math.floor(Math.random() * this.boardSize),
    ];
  }
}
