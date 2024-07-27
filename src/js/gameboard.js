import Ship from './ship';

export default class Gameboard {
  allShip = [];
  shipCoordinates = [];
  missedAttacks = [];
  hitAttacks = [];
  size = 10;
  DEFAULT_SHIPS_LENGTH = [5, 4, 3, 3, 2, 2, 2];

  constructor() {
    this.create2DArray(this.size);
  }

  create2DArray() {
    this.board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null),
    );
  }

  #isInbound([row, col]) {
    return row < this.size && row >= 0 && col < this.size && col >= 0;
  }

  placeShip([row, col], length, axis) {
    const newShip = new Ship(length);

    // Validate cell sequence
    for (let i = 0; i < length; i += 1) {
      const currentCol = axis === 'hor' ? col + i : col,
        currentRow = axis === 'ver' ? row + i : row;

      // Coordinate is either out of bound or overlapped with other ship
      if (
        !this.#isInbound([currentRow, currentCol]) ||
        this.board[currentRow][currentCol] !== null
      )
        return false;
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

  #randomCoor() {
    return [
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size),
    ];
  }

  placeRandomShip() {
    for (const ship of this.DEFAULT_SHIPS_LENGTH) {
      let axis = Math.floor(Math.random() * 2) > 0 ? 'hor' : 'ver',
        coordinate = this.#randomCoor();

      while (!this.placeShip(coordinate, ship, axis)) {
        coordinate = this.#randomCoor();
        axis = Math.floor(Math.random() * 2) > 0 ? 'hor' : 'ver';
      }
    }
    return true;
  }
}
