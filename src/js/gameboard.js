import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.size = 10;
    this.create2DArray(this.size);
  }

  create2DArray() {
    this.board = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null),
    );
  }

  // NOTE: Add validation for out of bound coordinate
  // eslint-disable-next-line max-statements
  placeShip(start, end) {
    const data = {
      axis: 'null',
      cellSequence: [],
      colEnd: end[1],
      colStart: start[1],
      rowEnd: end[0],
      rowStart: start[0],
      shipLength: 0,
    };

    // Coordinate validation : start is bigger than end
    if (data.rowStart > data.rowEnd || data.colStart > data.colEnd)
      return false;

    // Data properties
    data.axis = data.rowEnd - data.rowStart > 0 ? 'hor' : 'ver';
    data.shipLength =
      data.axis === 'hor'
        ? data.rowEnd - data.rowStart + 1
        : data.colEnd - data.colStart + 1;

    // Populate cell sequence
    for (let i = 0; i < data.shipLength; i += 1) {
      const col = data.axis === 'ver' ? data.colStart + i : data.colStart,
        row = data.axis === 'hor' ? data.rowStart + i : data.rowStart;

      // Cell is occupied, break function
      if (this.board[row][col] !== null) return false;

      data.cellSequence.push([row, col]);
    }

    // Finally placing ship
    {
      const newShip = new Ship(data.shipLength);
      data.cellSequence.forEach(
        ([row, col]) => (this.board[row][col] = newShip),
      );
    }

    return true;
  }
}
