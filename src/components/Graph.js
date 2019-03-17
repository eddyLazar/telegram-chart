import React from 'react';
import { Line } from 'react-konva';
import { countY, countX } from '../utils/points';
import Point from './Point';

export default ({
  name = '',
  color = '',
  points = [{ x: 0, y: 0 }],
  width = 0,
  height = 0,
  maxY = 0,
  minX = 0,
  maxX = 0
}) => {
  const linePoints = [];

  const pointElements = [];

  points.forEach((point, i) => {
    const y = countY(point.y, maxY, height);
    const x = countX(point.x, minX, maxX, width);
    linePoints.push(x);
    linePoints.push(y);
    pointElements.push(<Point key={i} {...{ x, y, color }} />);
  });

  return (
    <React.Fragment>
      <Line x={0} y={0} points={linePoints} stroke={color} />
      {pointElements}
    </React.Fragment>
  );
};
