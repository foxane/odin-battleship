import Gameboard from './gameboard';

// Helper fns, inaccessible from outside
const addCellAttributes = (cell, [row, col], callback) => {
  cell.classList.add('cell');
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.dataset.status = 'null';

  if (callback) {
    cell.addEventListener('click', () => {
      callback(cell);
    });
    cell.dataset.player = false;
  } else {
    cell.dataset.player = true;
  }
};

export default class Dom {
  boardSize = Gameboard.size;

  constructor() {
    this.playerElement = document.querySelector('.player');
    this.computerElement = document.querySelector('.computer');
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
        addCellAttributes(cell, [row, col], callback);

        board.appendChild(cell);
      }
    }
    return board;
  }

  renderBoard(shipCoordinates) {
    this.playerElement.innerHTML = '';
    for (const [row, col] of shipCoordinates) {
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"][data-player="true"]`,
      );
      cell.style.backgroundColor = 'blue';
    }
  }
}
