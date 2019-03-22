import range from 'ramda/src/range';

const defaultTelegramData = {
  columns: [['x']],
  types: {},
  names: {},
  colors: {}
};

const COLUMN_TYPES = {
  x: 'x',
  y: 'line'
};

export default (chartData = defaultTelegramData) => {
  const result = {
    data: [],
    lines: []
  };
  let linesData = range(0, chartData.columns[0].length - 1);

  linesData = linesData.map(() => ({}));

  chartData.columns.forEach(column => {
    linesData = linesData.map((dataItem, i) => ({
      ...dataItem,
      [column[0]]: column[i + 1]
    }));

    const dataKey = column[0];
    const columnType = chartData.types[dataKey];

    switch (columnType) {
      case COLUMN_TYPES.y:
        result.lines.push({
          yDataKey: dataKey,
          name: chartData.names[dataKey],
          color: chartData.colors[dataKey]
        });
        break;

      default:
        break;
    }
  });

  result.data = linesData;

  return result;
};
