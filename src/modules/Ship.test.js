import Ship from './Ship';

describe('Ship instantiation test', () => {
  
  test('Length is correct upon initiation', () => {
    const destroyer = new Ship(5);
    expect(destroyer.length).toBe(5);
  });

  test('Length is correct upon initiation', () => {
    const destroyer = new Ship(3);
    expect(destroyer.length).toBe(3);
  });

});
describe('hit method tests', () => {

  test('expect hit to increase ship.hits.length', () => {
    const destroyer = new Ship(5);
    destroyer.hit([0,0]);
    expect(destroyer.hits.length).toBe(1);
  });
  
  test('expect hit position to be in ship.hits array', () => {
    const destroyer = new Ship(5);
    destroyer.hit([3,2]);
    expect(destroyer.hits).toContainEqual([3,2]);
  });

  test('ship.hits should contain all the hits given', () => {
    const destroyer = new Ship(5);
    destroyer.hit([0,0]);
    destroyer.hit([1,0]);
    destroyer.hit([2,0]);
    expect(destroyer.hits).toContainEqual([0,0]);
    expect(destroyer.hits).toContainEqual([1,0]);
    expect(destroyer.hits).toContainEqual([2,0]);
    expect(destroyer.hits).not.toContainEqual([3,0]);
  });

});