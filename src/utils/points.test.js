import { findClosestX, countY, countX } from './points';

test('countY()', () => {
  expect(countY(90, 100, 100)).toBe(10);
  expect(countY(50, 100, 100)).toBe(50);
});

test('countX()', () => {
  expect(countX(5, 0, 200, 100)).toBe(2.5);
  expect(countX(43, 0, 200, 100)).toBe(43 / 2);
});

test('findClosestX()', () => {
  const xValues = [
    [0, 123],
    [759.6611964002118, 123],
    [919.7458973001587, 123],
    [1079.830598200106, 123],
    [1239.915299100053, 123],
    [1400, 123]
  ];

  expect(findClosestX({ x: 1040 }, xValues)).toBe(1079.830598200106);
  expect(findClosestX({ x: 1350 }, xValues)).toBe(1400);
  expect(findClosestX({ x: 1 }, xValues)).toBe(0);
});
