import Gameboard from '../src/js/gameboard';
import Ship from '../src/js/ship';

describe('Gameboard : initialize', () => {
  // Size should be equal to Gameboard size constructor
  const size = 10;
  let gameboard = null;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Initialize : board', () => {
    // Check outer array
    expect(gameboard.board instanceof Array).toBe(true);
    expect(gameboard.board.length).toBe(size);

    // Check inner array
    expect(gameboard.board[0] instanceof Array).toBe(true);
    expect(gameboard.board[0].length).toBe(size);
    expect(gameboard.board[0][0]).toBe(null);
    expect(gameboard.board[0][1]).toBe(null);
  });
});

describe('Gameboard : place ship', () => {
  let gameboard = null;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Place ship : horizontal', () => {
    expect(gameboard.placeShip([0, 1], [0, 2])).toBe(true);

    expect(gameboard.board[0][0]).toBe(null);
    expect(gameboard.board[0][1] instanceof Ship).toBe(true);
    expect(gameboard.board[0][2] instanceof Ship).toBe(true);
    expect(gameboard.board[0][3]).toBe(null);
  });

  test('Place ship : vertical', () => {
    expect(gameboard.placeShip([0, 5], [5, 5])).toBe(true);

    expect(gameboard.board[0][4]).toBe(null);
    expect(gameboard.board[0][5] instanceof Ship).toBe(true);
    expect(gameboard.board[5][5] instanceof Ship).toBe(true);
    expect(gameboard.board[5][6]).toBe(null);
  });

  test('Place ship : ship length of 1', () => {
    expect(gameboard.placeShip([0, 0], [0, 0])).toBe(true);
    expect(gameboard.board[0][0] instanceof Ship).toBe(true);
  });

  test('Place ship : used cell', () => {
    expect(gameboard.placeShip([0, 0], [4, 0])).toBe(true);
    expect(gameboard.placeShip([0, 0], [0, 5])).toBe(false);
  });

  test('Place ship : out of bound', () => {
    expect(gameboard.placeShip([0, 1], [12, 0])).toBe(false);
    expect(gameboard.board.some((row) => row.some((col) => col !== null))).toBe(
      false,
    );
  });

  test('Place ship : invalid coordinate (start: 10, end: 1)', () => {
    expect(gameboard.placeShip([0, 10], [0, 1])).toBe(false);
  });
});
