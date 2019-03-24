import React, { useState } from 'react';
import { Stage, Layer, Line, FastLayer } from 'react-konva';
import flatten from 'ramda/src/flatten';
import zip from 'ramda/src/zip';
import {
  findMaxValues,
  transformLineToCanvasPoints,
  findClosestX
} from '../../utils/points';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import { dateFormatter } from '../../utils/date';
import ActivePoints from '../ActivePoints';

export default ({
  width = 0,
  height = 0,
  lines = [],
  data = [],
  xAxisKey = '',
  xAxis = false,
  yAxis = false,
  highlightCursor = false,
  children
}) => {
  if (lines.length === 0) {
    return null;
  }

  const allXValues = data.map(item => item[xAxisKey]);

  let allYValus = [];

  lines.forEach(({ dataKey = '', color = '', name = '' }, index) => {
    const lineYValues = data.map(item => item[dataKey]);
    allYValus = [...allYValus, ...lineYValues];
    const points = zip(allXValues, lineYValues);
    lines[index] = { ...lines[index], points };
  });

  const [maxY, minX, maxX] = findMaxValues(allXValues, allYValus);

  const mapper = transformLineToCanvasPoints(minX, maxX, maxY, width, height);

  lines = lines.map(l => ({ ...l, points: mapper(l.points) }));

  const [closestX, setClosestX] = useState(null);

  const handleMouseMove = ev => {
    if (highlightCursor) {
      if (ev.target && ev.target.getPointerPosition) {
        const pointerPosition = ev.target.getPointerPosition();
        if (pointerPosition && lines.length) {
          setClosestX(findClosestX(pointerPosition, lines[0].points));
        }
      }
    }
  };

  return (
    <div
      onMouseMove={ev => {
        if (highlightCursor) {
          if (ev.target.nodeName !== 'CANVAS') {
            setClosestX(null);
          }
        }
      }}>
      {xAxis && <XAxis min={minX} max={maxX} formatter={dateFormatter} />}
      {yAxis && <YAxis max={maxY} />}
      <Stage width={width} height={height} onMouseMove={handleMouseMove}>
        <Layer>
          {lines.map(line => {
            return (
              <Line
                x={0}
                y={0}
                points={flatten(line.points)}
                stroke={line.color}
                key={line.dataKey}
              />
            );
          })}
          {highlightCursor && (
            <ActivePoints lines={lines} height={height} closestX={closestX} />
          )}
          {children}
        </Layer>
      </Stage>
    </div>
  );
};
