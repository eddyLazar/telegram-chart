import parseChart from './parse-chart';

const chartData = {
  columns: [
    ['x', 1542412800000, 1542499200000],

    ['y0', 37, 20],
    ['y1', 22, 12]
  ],
  types: {
    y0: 'line',
    y1: 'line',
    x: 'x'
  },
  names: {
    y0: '#0',
    y1: '#1'
  },
  colors: {
    y0: '#3DC23F',
    y1: '#F34C44'
  }
};

describe('should parse telegam chart data', () => {
  const expected = {
    data: [
      { x: 1542412800000, y0: 37, y1: 22 },
      { x: 1542499200000, y0: 20, y1: 12 }
    ],
    lines: [
      {
        yDataKey: 'y0',
        name: '#0',
        color: '#3DC23F'
      },
      {
        yDataKey: 'y1',
        name: '#1',
        color: '#F34C44'
      }
    ]
  };
  const actual = parseChart(chartData);
  test('should parse data', () => {
    expect(actual.data).toEqual(expected.data);
  });

  test('should parse lines info', () => {
    expect(actual.lines).toEqual(expected.lines);
  });
});
