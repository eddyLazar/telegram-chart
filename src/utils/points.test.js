import { countY, countX, findMaxY, findMinMaxX } from './points';

test('countY()', () => {
  expect(countY(90, 100, 100)).toBe(10);
  expect(countY(50, 100, 100)).toBe(50);
});

test('countX()', () => {
  expect(countX(5, 0, 200, 100)).toBe(2.5);
  expect(countX(43, 0, 200, 100)).toBe(43 / 2);
});

test('findMaxY()', () => {
  const maxY = findMaxY([{ y: 1 }, { y: 2 }, { y: 3 }]);
  expect(maxY).toBe(3);
});

test('findMinMaxX()', () => {
  const [minX, maxX] = findMinMaxX([{ x: 1 }, { x: 2 }, { x: 3 }]);
  expect(minX).toBe(1);
  expect(maxX).toBe(3);
});
