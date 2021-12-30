import { Dimensions } from 'react-native';
import { LineChart as LC } from 'react-native-chart-kit';
import { chartConfig, chartStyle } from './config';

function LineChart() {
  const renderlastDayLabels = () => {
    const result = [];
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes().toString();

    for (let i = hours; i > (hours - 6); i -= 1) {
      result.push(`${i}:${minutes}`);
    }

    return result.reverse();
  };
  return (
    <LC
      onDataPointClick={() => { console.log('datapoint'); }}
      data={{
        labels: renderlastDayLabels(),
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={Dimensions.get('window').width}
      height={220}
      yAxisSuffix="g"
      yAxisInterval={1}
      chartConfig={chartConfig}
      bezier
      style={chartStyle}
    />
  );
}

export default LineChart;
