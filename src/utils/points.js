export const countY = (y = 0, maxY = 0, height = 100) =>
  ((maxY - y) / maxY) * height;

export const countX = (x = 0, minX = 0, maxX = 0, width = 0) => {
  const diff = maxX - minX;
  const xDiff = x - minX;

  return (xDiff / diff) * width;
};

const findMouseDiff = (mouseX, pointX) => {
  const diff = pointX - mouseX;
  return diff > 0 ? diff : diff * -1;
};

const createDiff = mouseX => (a, b) => {
  return findMouseDiff(mouseX, a) - findMouseDiff(mouseX, b);
};

export const findClosestX = (
  mousePosition = { x: 0, y: 0 },
  points = [[0, 0]]
) => points.map(([x]) => x).sort(createDiff(mousePosition.x))[0];

export const buildLine = (data = []) => {};

export const findMaxValues = (xValues = [], yValues = []) => [
  Math.max(...yValues),
  Math.min(...xValues),
  Math.max(...xValues)
];

export const transformLineToCanvasPoints = (
  minX,
  maxX,
  maxY,
  width,
  height
) => (pointsPairs = []) =>
  pointsPairs.map(([x, y]) => [
    countX(x, minX, maxX, width),
    countY(y, maxY, height)
  ]);
