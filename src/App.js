import React from 'react';
import Point from './components/Point';
import Chart from './components/Chart';
import theme from './theme';

const expected = [
  {
    x: 1542002800000,
    y: 20,
    color: 'green',
    name: '#0'
  },
  {
    x: 1542412800000,
    y: 5,
    color: 'brown',
    name: '#0'
  },
  {
    x: 1542499200000,
    y: 100,
    color: 'red',
    name: '#0'
  },
  {
    x: 1542585600000,
    y: 40,
    color: 'orange',
    name: '#0'
  },
  {
    x: 1542672000000,
    y: 70,
    color: 'blue',
    name: '#0'
  },
  {
    x: 1542758400000,
    y: 90,
    color: 'pink',
    name: '#0'
  },
  {
    x: 1542750000000,
    y: 50,
    color: 'pink',
    name: '#0'
  }
];

export default () => {
  return (
    <div style={{ margin: theme.windowGap }}>
      <h1>Telegram chart</h1>
      <div style={{ border: '1px solid black', display: 'inline-block' }}>
        <Chart>
          {expected.map((p, i) => (
            <Point key={i} x={p.x} y={p.y} color={p.color} />
          ))}
        </Chart>
      </div>
    </div>
  );
};
