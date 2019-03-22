import React from 'react';
import Chart from './components/Chart';
import theme from './theme';
import Line from './components/Line';
import parseChart from './utils/parse-chart';
import telegramData from './chart_data.json';

const chartData = parseChart(telegramData[0]);

export default () => {
  return (
    <div style={{ margin: theme.windowGap }}>
      <h1>Telegram chart</h1>
      <br />
      <br />
      <div>
        <Chart data={chartData.data} xAxisKey="x">
          {chartData.lines.map(line => (
            <Line
              dataKey={line.yDataKey}
              color={line.color}
              key={line.yDataKey}
              name={line.name}
            />
          ))}
        </Chart>
      </div>
    </div>
  );
};
