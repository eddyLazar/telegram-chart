import React, { useState } from 'react';
import theme from '../../theme';
import prop from 'ramda/src/prop';
import path from 'ramda/src/path';
import Checkbox from '../Checkbox';
import { useToggleLines } from './Chart.hooks';
import Graph from '../Graph';
import ChartRegionSelect from '../ChartRegionSelect';
import { countXValue } from '../../utils/points';

const style = {
  position: 'relative'
};

export default ({ children = [], xAxisKey = '', data = [] }) => {
  const width = window.innerWidth - theme.windowGap * 2;
  const height = theme.chartHeight;

  const yDataKeys = children.map(getDataKeyFromProps);

  const [activeLines, setActiveLines] = useToggleLines(yDataKeys);

  const xValues = data.map(item => item[xAxisKey]);

  const [xSelectedRegion, setXSelectedRegion] = useState([
    countXValue(width - theme.regionSelector.minWidth, xValues, width),
    countXValue(width, xValues, width)
  ]);

  let lines = children
    .filter(({ props: { dataKey } }) => activeLines[dataKey])
    .map(prop('props'));

  const dataForBigChart = data.filter(item => {
    return (
      item[xAxisKey] >= xSelectedRegion[0] &&
      item[xAxisKey] <= xSelectedRegion[1]
    );
  });

  return (
    <div>
      <div style={style}>
        <Graph
          xAxis
          yAxis
          width={width}
          height={height}
          lines={lines}
          data={dataForBigChart}
          xAxisKey={xAxisKey}
          highlightCursor
        />
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
      <br />
      <br />
      <br />
      <Graph
        width={width}
        height={theme.regionSelector.height}
        lines={lines}
        data={data}
        xAxisKey={xAxisKey}>
        <ChartRegionSelect
          height={theme.regionSelector.height}
          width={width}
          onChange={([min, max]) => {
            setXSelectedRegion([
              countXValue(min, xValues, width),
              countXValue(max, xValues, width)
            ]);
          }}
        />
      </Graph>
    </div>
  );
};

const getDataKeyFromProps = path(['props', 'dataKey']);
