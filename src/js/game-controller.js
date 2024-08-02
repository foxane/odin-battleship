import Dom from './dom';
import Gameboard from './gameboard';
import Player from './player';

export default class GameController {
  constructor() {
    // Set up enviroment
    this.player = new Player();
    this.computer = new Player('computer');
    this.turn = 'over';
    this.dom = new Dom({
      randomizeBtnCb: this.#randomizePlayerShip.bind(this),
      resetBtnCb: this.#resetGame.bind(this),
      startBtnCb: this.#startGame.bind(this),
    });

    // Initialize
    this.#init();
  }

  #init() {
    this.dom.playerElement.appendChild(this.dom.createBoard());
    this.dom.computerElement.appendChild(
      this.dom.createBoard(this.playerAttack.bind(this)),
    );

    this.player.gameboard.placeRandomShip();
    this.computer.gameboard.placeRandomShip();
    this.dom.renderBoard(this.player.gameboard.shipCoordinates, true);
    console.table(this.computer.gameboard.board);
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
      this.#hitHandler([row, col], true);
    } else {
      cell.style.backgroundColor = 'white';
      this.turn = this.computer;
      this.computerAttack();
    }
    cell.dataset.status = 'hit';
  }

  computerAttack() {
    this.dom.computerElement.querySelector('.board').classList.add('inactive');
    this.dom.playerElement.querySelector('.board').classList.remove('inactive');
    setTimeout(() => {
      if (this.turn !== this.computer) return;
      const getRandomCoor = () => [
        Math.floor(Math.random() * Gameboard.size),
        Math.floor(Math.random() * Gameboard.size),
      ];

      let [row, col] = getRandomCoor();
      let cell = Dom.getCellElement([row, col], true);

      while (cell.dataset.status !== 'null') {
        [row, col] = getRandomCoor();
        cell = Dom.getCellElement([row, col], true);
      }

      // Hit
      if (this.player.gameboard.receiveAttack([row, col])) {
        cell.style.backgroundColor = 'red';
        cell.dataset.status = 'hit';
        this.#hitHandler([row, col], false);
        this.computerAttack();
      } else {
        cell.style.backgroundColor = 'white';
        cell.dataset.status = 'miss';
        this.dom.computerElement
          .querySelector('.board')
          .classList.remove('inactive');
        this.dom.playerElement
          .querySelector('.board')
          .classList.add('inactive');
        this.turn = this.player;
      }
    }, 1000);
  }

  #hitHandler([row, col], isPlayer) {
    // Ship sunken
    if (isPlayer) {
      if (this.computer.gameboard.board[row][col].isSunk()) {
        for (const [x, y] of this.computer.gameboard.shipCoordinates) {
          if (this.computer.gameboard.board[x][y].isSunk()) {
            const cell = document.querySelector(
              `.cell[data-row="${x}"][data-col="${y}"][data-player="false"]`,
            );
            cell.style.backgroundColor = 'green';
          }
        }
      }
    } else {
      if (this.player.gameboard.board[row][col].isSunk()) {
        for (const [x, y] of this.player.gameboard.shipCoordinates) {
          if (this.player.gameboard.board[x][y].isSunk()) {
            const cell = document.querySelector(
              `.cell[data-row="${x}"][data-col="${y}"][data-player="true"]`,
            );
            cell.style.backgroundColor = 'green';
          }
        }
      }
    }

    if (this.computer.gameboard.isAllSunk()) {
      alert('you win');
      this.#resetGame();
    }
  }

  #randomizePlayerShip() {
    this.player.gameboard.resetBoard();
    this.player.gameboard.placeRandomShip();
    this.dom.renderBoard(this.player.gameboard.shipCoordinates, true);
  }

  #resetGame() {
    this.player.gameboard.resetBoard();
    this.player.gameboard.placeRandomShip();
    this.computer.gameboard.resetBoard();
    this.computer.gameboard.placeRandomShip();

    this.dom.clearBoardElement(true);
    this.dom.clearBoardElement(false);
    this.dom.renderBoard(this.player.gameboard.shipCoordinates, true);

    this.dom.enableBtn('start-btn');
    this.dom.enableBtn('randomize-btn');
    this.dom.disableBtn('reset-btn');

    this.turn = 'over';
  }

  #startGame() {
    this.dom.disableBtn('start-btn');
    this.dom.disableBtn('randomize-btn');
    this.dom.enableBtn('reset-btn');

    this.dom.computerElement
      .querySelector('.board')
      .classList.remove('inactive');

    this.turn = this.player;
  }
}
