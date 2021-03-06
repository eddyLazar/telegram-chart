import React from 'react';
import Chart from './components/Chart';
import theme from './theme';
import Line from './components/Line';
import parseChart from './utils/parse-chart';
import telegramData from './chart_data.json';

// const chartData = parseChart(telegramData[0]);
// console.log(telegramData);

export default () => {
  return telegramData.map((chartData, i) => {
    const { data, lines } = parseChart(chartData);
    return (
      <div style={{ margin: theme.windowGap }} key={i}>
        <h1>Followers</h1>
        <br />
        <br />
        <div>
          <Chart data={data} xAxisKey="x">
            {lines.map(line => (
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
  });
};
