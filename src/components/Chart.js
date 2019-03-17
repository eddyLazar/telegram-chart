import React from 'react';
import { Stage, Layer } from 'react-konva';
import { findMaxY, findMinMaxX } from '../utils/points';
import theme from '../theme';
import flatten from 'ramda/src/flatten';

export default ({ children = [] }) => {
  const width = window.innerWidth - theme.windowGap * 2;
  const height = theme.chartHeight;

  const allPoints = flatten(children.map(({ props: { points } }) => points));
  console.log(allPoints);

  const maxY = findMaxY(allPoints);
  const [minX, maxX] = findMinMaxX(allPoints);

  return (
    <Stage
      width={width}
      height={height}
      onMouseLeave={() => console.log('mouse out')}>
      <Layer>
        {children.map((el, key) =>
          React.cloneElement(el, { width, height, key, maxY, minX, maxX })
        )}
      </Layer>
    </Stage>
  );
};
