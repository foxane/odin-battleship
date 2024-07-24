import Player from '../src/js/player';

describe('Initialize', () => {
  const computer = new Player('computer'),
    human = new Player('human');

  test('Init : human or bot', () => {
    expect(human.isHuman).toBe(true);
    expect(computer.isHuman).toBe(false);
  });

  test('Init : board', () => {
    expect(human.gameboard.board instanceof Array).toBe(true);
  });
});

// Test for computer, to be added later
// ..
