import attack from './index';
export default class Dom {
  size = 10;

  createBoard(inactive) {
    const board = document.createElement('div');
    if (inactive) board.classList.add('inactive');
    board.classList.add('board');

    for (let row = 0; row < this.size; row += 1) {
      for (let col = 0; col < this.size; col += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        this.#setCellAttr(cell, [row, col], inactive);
        board.appendChild(cell);
      }
    }
    return board;
  }

  #setCellAttr(cell, [row, col], inactive) {
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.status = null;

    // If board is inactive add listener to them
    if (inactive)
      cell.addEventListener('click', (e) => {
        attack(cell);
      });
  }

  renderBoard(shipCoordinates) {
    for (const [row, col] of shipCoordinates) {
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`,
      );
      cell.style.backgroundColor = 'blue';
    }
  }
}
