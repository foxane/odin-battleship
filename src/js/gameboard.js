import Ship from './ship';

export default class Gameboard {
  // Size reference for other module
  static size = 10;
  allShip = [];
  shipCoordinates = [];
  missedAttacks = [];
  hitAttacks = [];
  DEFAULT_SHIPS_LENGTH = [5, 4, 4, 3, 3, 3, 2, 2, 2];
  ADJACENT_EDGES = [
    [+0, +1],
    [+0, -1],
    [+1, +0],
    [+1, +1],
    [+1, -1],
    [-1, +1],
    [-1, +0],
    [-1, -1],
  ];

  constructor() {
    this.create2DArray(Gameboard.size);
  }

  create2DArray() {
    this.board = Array.from({ length: Gameboard.size }, () =>
      Array.from({ length: Gameboard.size }, () => null),
    );
  }

  resetBoard() {
    this.allShip = [];
    this.shipCoordinates = [];
    this.create2DArray(Gameboard.size);
  }

  #validateCoordinate(row, col) {
    const unoccupied = (x, y) => this.board[x][y] === null;
    const inBound = (x, y) =>
      x < Gameboard.size && x >= 0 && y < Gameboard.size && y >= 0;
    const noAdjacent = (row_, col_) => {
      for (let [x, y] of this.ADJACENT_EDGES) {
        x += row_;
        y += col_;

        if (inBound(x, y)) {
          const cell = this.board[x][y];
          if (cell !== null) return false;
        }
      }
      return true;
    };

    return noAdjacent(row, col) && inBound(row, col) && unoccupied(row, col);
  }

  placeShip([row, col], length, axis) {
    const newShip = new Ship(length);

    // Validate cell sequence
    for (let i = 0; i < length; i += 1) {
      const currentCol = axis === 'hor' ? col + i : col,
        currentRow = axis === 'ver' ? row + i : row;

      // Coordinate is either out of bound or overlapped with other ship
      if (!this.#validateCoordinate(currentRow, currentCol)) return false;
    }

    // Populate cells
    for (let i = 0; i < length; i += 1) {
      const currentCol = axis === 'hor' ? col + i : col,
        currentRow = axis === 'ver' ? row + i : row;

      this.board[currentRow][currentCol] = newShip;
      this.shipCoordinates.push([currentRow, currentCol]);
    }

    this.allShip.push(newShip);
    return true;
  }

  receiveAttack([row, col]) {
    if (this.board[row][col] === null) {
      this.missedAttacks.push([row, col]);
      return false;
    }

    this.board[row][col].hit();
    this.hitAttacks.push([row, col]);
    return true;
  }

  isAllSunk() {
    return this.allShip.every((ship) => ship.isSunk());
  }

  placeRandomShip() {
    for (const shipLength of this.DEFAULT_SHIPS_LENGTH) {
      let axis = Math.floor(Math.random() * 2) > 0 ? 'hor' : 'ver',
        coordinate = [
          Math.floor(Math.random() * Gameboard.size),
          Math.floor(Math.random() * Gameboard.size),
        ];

      while (!this.placeShip(coordinate, shipLength, axis)) {
        coordinate = [
          Math.floor(Math.random() * Gameboard.size),
          Math.floor(Math.random() * Gameboard.size),
        ];
        axis = Math.floor(Math.random() * 2) > 0 ? 'hor' : 'ver';
      }
    }
    return true;
  }
}
