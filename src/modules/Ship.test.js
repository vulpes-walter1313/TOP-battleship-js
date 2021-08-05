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
    destroyer.hit(15);
    expect(destroyer.hits.length).toBe(1);
  });
  
  test('expect hit position to be in ship.hits array', () => {
    const destroyer = new Ship(5);
    destroyer.hit(14);
    expect(destroyer.hits[0]).toBe(14);
  });

  test('ship.hits should contain all the hits given', () => {
    const destroyer = new Ship(5);
    destroyer.hit(14);
    destroyer.hit(7);
    destroyer.hit(25);
    expect(destroyer.hits).toContain(14);
    expect(destroyer.hits).toContain(25);
    expect(destroyer.hits).toContain(7);
  });

});