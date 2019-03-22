import React from 'react';
import { Circle, Line } from 'react-konva';
import theme from '../theme';

export default ({
  height = 0,
  closestX = null,
  lines = [{ color: '', points: [] }]
}) => {
  if (!closestX) {
    return null;
  }

  const activePointElements = [];

  lines.forEach(({ color, points } = [], index = 0) => {
    const closesPoint = points.find(([x, y]) => x === closestX);

    if (closesPoint) {
      activePointElements.push(
        <Circle
          x={closesPoint[0]}
          y={closesPoint[1]}
          radius={5}
          fill="white"
          stroke={color}
          key={index}
        />
      );
    }
  });

  return (
    <React.Fragment>
      {closestX && (
        <Line
          x={0}
          y={0}
          points={[closestX, height, closestX, 0]}
          stroke={theme.colors.border}
        />
      )}
      {activePointElements}
    </React.Fragment>
  );
};
