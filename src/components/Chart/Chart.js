import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import theme from '../../theme';
import XAxis from './../XAxis';
import YAxis from './../YAxis';
import { dateFormatter } from '../../utils/date';
import prop from 'ramda/src/prop';
import path from 'ramda/src/path';
import {
  findClosestX,
  findMaxValues,
  transformLineToCanvasPoints
} from '../../utils/points';
import flatten from 'ramda/src/flatten';
import zip from 'ramda/src/zip';
import ActivePoints from '../ActivePoints';
import Checkbox from '../Checkbox';
import { useToggleLines } from './Chart.hooks';

const style = {
  position: 'relative'
};

export default ({ children = [], xAxisKey = '', data = [] }) => {
  const allXValues = data.map(prop(xAxisKey));
  let allYValus = [];
  const width = window.innerWidth - theme.windowGap * 2;
  const height = theme.chartHeight;

  const yDataKeys = children.map(getDataKeyFromProps);
  const [closestX, setClosestX] = useState(null);
  const [activeLines, setActiveLines] = useToggleLines(yDataKeys);

  let lines = children
    .filter(({ props: { dataKey } }) => activeLines[dataKey])
    .map(prop('props'));

  lines.forEach(({ dataKey = '', color = '', name = '' }, index) => {
    if (activeLines[dataKey]) {
      const lineYValues = data.map(prop(dataKey));
      allYValus = [...allYValus, ...lineYValues];
      const points = zip(allXValues, lineYValues);
      lines[index] = { ...lines[index], points };
    }
  });

  const [maxY, minX, maxX] = findMaxValues(allXValues, allYValus);

  const mapper = transformLineToCanvasPoints(minX, maxX, maxY, width, height);

  lines = lines.map(l => ({ ...l, points: mapper(l.points) }));

  const handleMouseMove = ev => {
    if (ev.target && ev.target.getPointerPosition) {
      const pointerPosition = ev.target.getPointerPosition();
      if (pointerPosition && lines.length) {
        setClosestX(findClosestX(pointerPosition, lines[0].points));
      }
    }
  };

  return (
    <div>
      <div style={style}>
        <XAxis min={minX} max={maxX} formatter={dateFormatter} />
        <YAxis max={maxY} formatter={dateFormatter} />
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
            <ActivePoints lines={lines} height={height} closestX={closestX} />
          </Layer>
        </Stage>
      </div>
      <br />
      <br />
      <br />
      {children.map(({ props: { name, dataKey } }) => {
        const checked = activeLines[dataKey];
        let disabled = false;

        if (checked && lines.length === 1) {
          disabled = true;
        }
        return (
          <Checkbox
            disabled={disabled}
            name={name}
            checked={checked}
            key={name}
            onChange={() => setActiveLines(dataKey)}
          />
        );
      })}
    </div>
  );
};

const getDataKeyFromProps = path(['props', 'dataKey']);
