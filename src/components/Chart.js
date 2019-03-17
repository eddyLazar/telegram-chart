import React from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';
import theme from '../theme';
import XAxis from './XAxis';
import YAxis from './YAxis';
import { dateFormatter } from '../utils/date';
import prop from 'ramda/src/prop';

const style = {
  position: 'relative'
};

export default ({ children = [], XAxisKey = '', data = [] }) => {
  const xValues = data.map(prop(XAxisKey));
  let yValus = [];

  children.forEach(lineEl => {
    yValus = [...yValus, ...data.map(prop(lineEl.props.dataKey))];
  });

  const width = window.innerWidth - theme.windowGap * 2;
  const height = theme.chartHeight;

  const maxY = Math.max(...yValus);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  return (
    <div style={style}>
      <XAxis min={minX} max={maxX} formatter={dateFormatter} />
      <YAxis max={maxY} formatter={dateFormatter} />
      <Stage width={width} height={height}>
        <Layer>
          {children.map((el, key) => {
            const yAxisKey = el.props.dataKey;

            const points = data.map(dataItem => [
              prop(XAxisKey, dataItem),
              prop(yAxisKey, dataItem)
            ]);

            return React.cloneElement(el, {
              key,
              points,
              width: width,
              height: height,
              maxY,
              minX,
              maxX
            });
          })}
        </Layer>
      </Stage>
    </div>
  );
};
