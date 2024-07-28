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
  beforeEach(() => (gameboard = new Gameboard()));

  test('Place ship : horizontal', () => {
    expect(gameboard.placeShip([0, 1], 2, 'hor')).toBe(true);
    expect(gameboard.board[0][0]).toBe(null);
    expect(gameboard.board[0][1] instanceof Ship).toBe(true);
    expect(gameboard.board[0][2] instanceof Ship).toBe(true);
    expect(gameboard.board[0][3]).toBe(null);
  });

  test('Place ship : vertical', () => {
    expect(gameboard.placeShip([0, 5], 5, 'ver')).toBe(true);
    expect(gameboard.board[0][4]).toBe(null);
    expect(gameboard.board[0][5] instanceof Ship).toBe(true);
    expect(gameboard.board[4][5] instanceof Ship).toBe(true);
    expect(gameboard.board[5][5]).toBe(null);
  });

  test('Place ship : ship length of 1', () => {
    expect(gameboard.placeShip([0, 0], 1, 'ver')).toBe(true);
    expect(gameboard.board[0][0] instanceof Ship).toBe(true);
  });

  test('Place ship : used cell', () => {
    expect(gameboard.placeShip([0, 0], 5, 'ver')).toBe(true);
    expect(gameboard.placeShip([0, 0], 5, 'hor')).toBe(false);
  });

  test('Place ship : out of bound', () => {
    expect(gameboard.placeShip([0, 12], 10, 'hor')).toBe(false);
    expect(gameboard.board.some((row) => row.some((col) => col !== null))).toBe(
      false,
    );
  });

  test('Place ship : store ship instance', () => {
    gameboard.placeShip([0, 0], 1, 'ver');
    expect(gameboard.allShip[0] instanceof Ship).toBe(true);
  });
});

describe('Gameboardd : receive attack', () => {
  let gameboard = null;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.placeShip([0, 0], 5, 'hor');
    gameboard.placeShip([1, 0], 3, 'ver');
  });

  test('Receive attack : hit', () => {
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.board[0][0].hitCount).toBe(1);
  });

  test('Receive attack : miss', () => {
    expect(gameboard.receiveAttack([1, 1])).toBe(false);
  });

  test('Receive attack : store missed coordinate', () => {
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedAttacks[0].toString()).toBe('1,1');
  });

  test('Receive attack : store hit coordinate', () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.hitAttacks[0].toString()).toBe('0,0');
  });
});

describe('Is all ship sunk', () => {
  let gameboard = null;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.placeShip([0, 0], 3, 'hor');
  });

  test('All sunk : happy path', () => {
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    expect(gameboard.isAllSunk()).toBe(true);
  });

  test('All sunk : hitted, not sunk', () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.isAllSunk()).toBe(false);
  });
});

describe('Random placement', () => {
  test('Random : do it 10 times', () => {
    for (let i = 0; i < 10; i += 1) {
      const gameboard = new Gameboard();
      gameboard.placeRandomShip();
      expect(gameboard.allShip.length).toBe(9);
    }
  });
});
