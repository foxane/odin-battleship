import Dom from './dom';
import Player from './player';

export default class GameController {
  constructor() {
    // Set up enviroment
    this.player = new Player();
    this.computer = new Player('computer');
    this.turn = this.player;
    this.dom = new Dom();

    // Initialize
    this.#init();
  }

  #init() {
    this.dom.playerElement.appendChild(this.dom.createBoard());
    this.dom.computerElement.appendChild(
      this.dom.createBoard(this.playerAttack),
    );

    /*   NOTE : Below code resulted in infinite loop, find out why before running it */

    // this.player.gameboard.placeRandomShip();
    // this.computer.gameboard.placeRandomShip();
    // this.dom.playerElement.renderBoard(this.player.gameboard.shipCoordinates);
  }

  playerAttack(cell) {
    const {
      dataset: { row, col, status },
    } = cell;

    // Status is not null (assigned when created) or not player turn
    if (status !== 'null' || this.turn !== this.player) return;

    // Began Attack
    if (this.computer.gameboard.receiveAttack([row, col])) {
      cell.style.backgroundColor = 'red';
      this.#playerAttackHitHandler([row, col]);
    } else {
      cell.style.backgroundColor = 'white';
      this.turn = this.computer;
    }
  }

  #playerAttackHitHandler([row, col]) {
    // Ship sunken
    if (this.player.gameboard.board[row][col].isSunk()) {
      for (const [x, y] of this.computer.shipCoordinates) {
        if (this.computer.gameboard.board[x][y].isSunk()) {
          const cell = document.querySelector(
            `.cell[data-row="${x}"][data-col="${y}"][data-player="true"]`,
          );
          cell.style.backgroundColor = 'black';
        }
      }
    }
  }
}
