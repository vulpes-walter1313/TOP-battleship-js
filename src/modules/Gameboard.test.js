import Gameboard from "./Gameboard";
import Ship from './Ship';

test('Board has array of 10 arrays with 10 cells each', () => {
  const board = new Gameboard();
  expect(board.board.length).toBe(10);
  expect(board.board[0].length).toBe(10);
  expect(board.board[3].length).toBe(10);
  expect(board.board[5].length).toBe(10);
  expect(board.board[9].length).toBe(10);

});

test('Board shows all ships are afloat on init', () => {
  const board = new Gameboard();
  expect(board.allShipsSunk).toBe(false);
});

test('Board shows if all ships are sunk', () => {
  const board = new Gameboard();
  board.areAllShipsSunk(true);
  expect(board.allShipsSunk).toBe(true);
})

test('Place Ship on board in X axis', () => {
  const board = new Gameboard();
  const destroyer = new Ship(5);
  const coordinates = [0, 0, 'x'];
  board.placeShip(destroyer, coordinates);
  expect(board.board[0][0]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[1][0]).toEqual({hasShip: false, hasBeenShot: false});
  expect(board.board[0][1]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[0][2]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[0][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[0][4]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[0][5]).toEqual({hasShip: false, hasBeenShot: false});
});

test('Place Ship on board in Y axis', () => {
  const board = new Gameboard();
  const destroyer = new Ship(5);
  const coordinates = [2, 3, 'y'];
  board.placeShip(destroyer, coordinates);
  expect(board.board[2][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[2][4]).toEqual({hasShip: false, hasBeenShot: false});
  expect(board.board[3][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[4][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[5][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[6][3]).toEqual({hasShip: true, hasBeenShot: false});
  expect(board.board[7][3]).toEqual({hasShip: false, hasBeenShot: false});
});

test('Place Ship on board in too short X axis throws error', () => {
  const board = new Gameboard();
  const destroyer = new Ship(5);
  const coordinates = [0, 8, 'x'];
  expect(() => board.placeShip(destroyer, coordinates)).toThrowError();
});


test('isPlacementValid in y axis is working correctly', () => {
  const board = new Gameboard();
  const coordinates1 = [0,0];
  const coordinates2 = [2,3];
  const coordinates3 = [7,8];
  expect(board.isPlacementValid(coordinates1, 5, 'y')).toBe(true);
  expect(board.isPlacementValid(coordinates2, 5, 'y')).toBe(true);
  expect(board.isPlacementValid(coordinates3, 5, 'y')).toBe(false);
  expect(board.isPlacementValid(coordinates3, 3, 'y')).toBe(true);
  expect(board.isPlacementValid(coordinates3, 4, 'y')).toBe(false);
});

test('isPlacementValid in x axis is working correctly', () =>{
  const board = new Gameboard();
  const coordinates1 = [0,0];
  const coordinates2 = [2,3];
  const coordinates3 = [7,8];
  expect(board.isPlacementValid(coordinates1, 5, 'x')).toBe(true);
  expect(board.isPlacementValid(coordinates2, 2, 'x')).toBe(true);
  expect(board.isPlacementValid(coordinates3, 3, 'x')).toBe(false);
  expect(board.isPlacementValid(coordinates3, 4, 'x')).toBe(false);
  expect(board.isPlacementValid(coordinates3, 2, 'x')).toBe(true);
});

test.todo('receiveAttack can detect ships');
test.todo('receiveAttack send hit method to correct ship');
test.todo('receiveAttack records correctly hit cells');