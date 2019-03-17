import React from 'react';
import { Line } from 'react-konva';
import { countY, countX } from '../utils/points';
import theme from '../theme';
import flatten from 'ramda/src/flatten';

export default ({
  dataKey = '',
  color = 'black',
  points = [[0, 0]],
  maxY = 0,
  minX = 0,
  maxX = 0,
  width = 0,
  height = 0
}) => {
  const linePoints = flatten(
    points.map(([x, y]) => {
      const canvasX = countX(x, minX, maxX, width);
      const canvasY = countY(y, maxY, height);

      return [canvasX, canvasY];
    })
  );

  return <Line x={0} y={0} points={linePoints} stroke={color} />;
};
