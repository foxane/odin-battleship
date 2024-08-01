const BOARD_SIZE = 10;

const createBoard = (callback) => {
  const board = document.createElement('div');
  board.classList.add('board');

  // Add inactive class if computer (for init)
  if (callback) board.classList.add('inactive');

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.dataset.status = 'null';

      // Callback is provided
      if (callback)
        cell.addEventListener('click', () => {
          callback(cell);
        });

      board.appendChild(cell);
    }
  }

  return board;
};

const renderBoard = (shipCoordinates) => {
  for (const [row, col] of shipCoordinates) {
    const cell = document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`,
    );
    cell.style.backgroundColor = 'blue';
  }
};

export { createBoard, renderBoard };
