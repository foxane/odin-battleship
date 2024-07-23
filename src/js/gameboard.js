import Ship from './ship';

export default class Gameboard {
  missedAttacks = [];
  hitAttacks = [];
  size = 10;

  constructor() {
    this.create2DArray(this.size);
  }

  create2DArray() {
    this.board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null),
    );
  }

  // NOTE: Add validation for out of bound coordinate
  placeShip(start, end) {
    // Coordinate validation: start is bigger than end
    if (start[0] > end[0] || start[1] > end[1]) return false;

    const [[rowStart, colStart], [rowEnd, colEnd]] = [start, end],
      axis = rowEnd - rowStart > 0 ? 'hor' : 'ver',
      cellSequence = [],
      length = axis === 'hor' ? rowEnd - rowStart + 1 : colEnd - colStart + 1,
      newShip = new Ship(length);

    // Populate cell sequence
    for (let i = 0; i < length; i += 1) {
      const col = axis === 'ver' ? colStart + i : colStart,
        row = axis === 'hor' ? rowStart + i : rowStart;
      if (this.board[row][col] !== null) {
        // Break function when cell is occupied
        return false;
      }
      cellSequence.push([row, col]);
    }

    cellSequence.forEach(([row, col]) => (this.board[row][col] = newShip));
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
}
