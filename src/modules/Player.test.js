import Player from './Player';
import Ship from './Ship';

describe('Player init Structure', () => {
  test('Player has gameboard', () => {
    const player = new Player('Karl');
    expect(player.gameboard.board[0].length).toBe(10);
    expect(player.gameboard.board[0][0]).toEqual({hasShip: false, hasBeenShot: false});
  });
});

describe('Computer Attack test', () => {
  
  test('Computer can make a valid move', () => {
    const computer = new Player();
    const coords = computer.computerMove();
    expect(coords[0]).toBeGreaterThanOrEqual(0);
    expect(coords[1]).toBeLessThanOrEqual(9);
    expect(coords.length).toBe(2);
  });
  
});