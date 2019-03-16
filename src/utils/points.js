export const countY = (y = 0, maxY = 0, height = 100) => ((maxY - y) / maxY) * height;
export const countX = (x = 0, minX = 0, maxX = 0, width = 0) => {
  const diff = maxX - minX;
  const xDiff = x - minX;

  return (xDiff / diff) * width;
};

export const findMaxY = (points = [{ y: 0 }]) => {
  const yValues = points.map(p => p.y);
  return Math.max(...yValues);
};

export const findMinMaxX = (points = [{ x: 0 }]) => {
  const xValues = points.map(p => p.x);
  return [Math.min(...xValues), Math.max(...xValues)];
};
