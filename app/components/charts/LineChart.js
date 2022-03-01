import { Dimensions } from 'react-native';
import { LineChart as LC } from 'react-native-chart-kit';
import { chartConfig, chartStyle } from './config';

function LineChart({ data, labels }) {
  return (
    <LC
      onDataPointClick={({ value }) => { console.log(value); }}
      data={{
        labels,
        datasets: [
          {
            data,
          },
        ],
      }}
      fromZero
      width={Dimensions.get('window').width}
      height={250}
      yAxisSuffix="g"
      yAxisInterval={10}
      chartConfig={chartConfig}
      bezier
      style={chartStyle}
    />
  );
}

export default LineChart;
