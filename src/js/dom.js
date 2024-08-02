import Gameboard from './gameboard';

/* eslint-disable class-methods-use-this */

export default class Dom {
  boardSize = Gameboard.size;
  oldPlayerShipCoordinate = [];
  oldComputerShipCoordinate = [];

  constructor({ startBtnCb, randomizeBtnCb, resetBtnCb }) {
    // Player element
    this.playerElement = document.querySelector('.player');
    this.computerElement = document.querySelector('.computer');

    // Element buttons
    this.startBtn = document.querySelector('.start-btn');
    this.randomizeBtn = document.querySelector('.randomize-btn');
    this.resetBtn = document.querySelector('.reset-btn');

    // Element eventhandler
    this.startBtn.addEventListener('click', () => {
      startBtnCb();
    });
    this.randomizeBtn.addEventListener('click', () => {
      randomizeBtnCb();
    });
    this.resetBtn.addEventListener('click', () => {
      resetBtnCb();
    });
  }

  createBoard(callback) {
    const board = document.createElement('div');
    if (callback) {
      board.classList.add('board', 'inactive');
    } else {
      board.classList.add('board');
    }

    for (let row = 0; row < this.boardSize; row += 1) {
      for (let col = 0; col < this.boardSize; col += 1) {
        const cell = document.createElement('div');
        this.addCellAttributes(cell, [row, col], callback);

        board.appendChild(cell);
      }
    }
    return board;
  }

  renderBoard(shipCoordinates, isPlayer) {
    // Clear old ship if any
    this.clearBoardElement(isPlayer);

    for (const [row, col] of shipCoordinates) {
      const cell = Dom.getCellElement([row, col], isPlayer);
      cell.style.backgroundColor = 'blue';
    }
  }

  clearBoardElement(isPlayer) {
    const cells = document.querySelectorAll(`.cell[data-player="${isPlayer}"]`);
    for (const cell of cells) {
      cell.style.backgroundColor = 'black';
      cell.dataset.status = 'null';
    }
  }

  addCellAttributes(cell, [row, col], callback) {
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.status = 'null';

    // Optionally add handler when provided
    if (callback) {
      cell.addEventListener('click', () => {
        callback(cell);
      });
      cell.dataset.player = 'false';
    } else {
      cell.dataset.player = 'true';
    }
  }

  disableBtn(btnClass) {
    const btn = document.querySelector(`.${btnClass}`);
    btn.setAttribute('disabled', true);
    btn.style.display = 'none';
  }

  enableBtn(btnClass) {
    const btn = document.querySelector(`.${btnClass}`);
    btn.removeAttribute('disabled');
    btn.style.display = 'block';
  }

  static getCellElement = ([row, col], isPlayer) =>
    document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"][data-player="${isPlayer}"]`,
    );
}
