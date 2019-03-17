import React from 'react';
import Point from './components/Point';
import Chart from './components/Chart';
import theme from './theme';
import Graph from './components/Graph';

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

const graph = {
  name: '#0',
  color: 'pink',
  points: [
    {
      x: 1542002800000,
      y: 20
    },
    {
      x: 1542412800000,
      y: 5
    },
    {
      x: 1542499200000,
      y: 100
    },
    {
      x: 1542585600000,
      y: 40
    },
    {
      x: 1542672000000,
      y: 70
    },
    {
      x: 1542758400000,
      y: 90
    },
    {
      x: 1542750000000,
      y: 50
    }
  ]
};

const graph2 = {
  name: '#1',
  color: 'black',
  points: [
    {
      x: 1542002800000,
      y: 25
    },
    {
      x: 1542585600000,
      y: 12
    },
    {
      x: 1542720000000,
      y: 61
    }
  ]
};

export default () => {
  return (
    <div style={{ margin: theme.windowGap }}>
      <h1>Telegram chart</h1>
      <div style={{ border: '1px solid black', display: 'inline-block' }}>
        <Chart>
          <Graph {...graph} />
          <Graph {...graph2} />
        </Chart>
      </div>
    </div>
  );
};
