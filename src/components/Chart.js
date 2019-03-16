import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { countY, countX, findMaxY, findMinMaxX } from '../utils/points';
import theme from '../theme';

export default ({ children = [] }) => {
  const width = window.innerWidth - theme.windowGap * 2;
  const height = theme.chartHeight;
  const points = children.map(({ props }) => props);

  const maxY = findMaxY(points);
  const [minX, maxX] = findMinMaxX(points);

  const linePoints = [];
  children.forEach(pointEl => {
    const y = countY(pointEl.props.y, maxY, height);
    const x = countX(pointEl.props.x, minX, maxX, width);
    linePoints.push(x);
    linePoints.push(y);
  });

  return (
    <Stage
      width={width}
      height={height}
      onMouseMove={(...args) => {
        console.log(args);
      }}
      onMouseLeave={() => console.log('mouse out')}>
      <Layer>
        <Line x={0} y={0} points={linePoints} stroke="black" />
        {children.map(pointEl => {
          const y = countY(pointEl.props.y, maxY, height);
          const x = countX(pointEl.props.x, minX, maxX, width);

          return React.cloneElement(pointEl, { x, y });
        })}
      </Layer>
    </Stage>
  );
};
