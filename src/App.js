import React from 'react';
import Chart from './components/Chart';
import theme from './theme';
import Line from './components/Line';

const data = [
  {
    x: 1542002800000,
    y0: 20,
    y1: 12
  },
  {
    x: 1542412800000,
    y0: 27,
    y1: 37
  },
  {
    x: 1542499200000,
    y0: 11,
    y1: 0
  },
  {
    x: 1542585600000,
    y0: 35,
    y1: 48
  },
  {
    x: 1542672000000,
    y0: 56,
    y1: 68
  },
  {
    x: 1542758400000,
    y0: 33,
    y1: 28
  }
];

export default () => {
  return (
    <div style={{ margin: theme.windowGap }}>
      <h1>Telegram chart</h1>
      <br />
      <br />
      <div style={{ display: 'inline-block' }}>
        <Chart data={data} XAxisKey="x">
          <Line dataKey="y0" color="pink" />
          <Line dataKey="y1" color="red" />
        </Chart>
      </div>
    </div>
  );
};
