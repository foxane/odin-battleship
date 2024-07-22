import Ship from '../src/js/ship';

describe('Ship', () => {
  const length = 2;
  let ship = null;

  beforeEach(() => {
    ship = new Ship(length);
  });

  test('Hit', () => {
    ship.hit();
    ship.hit();

    expect(ship.hitCount).toBe(length);
  });

  test('Sink', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
