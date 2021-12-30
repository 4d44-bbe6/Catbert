import { Dimensions } from 'react-native';
import { StackedBarChart as SBC } from 'react-native-chart-kit';
import { chartConfig, chartStyle } from './config';

import { cats } from '../../config/data/initial-state.json';

function StackedBarChart() {
  return (
    <SBC
      hideLegend
      data={{
        labels: cats,
        legend: cats,
        data: [
          [Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100],
          [Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
          [Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        ],
        barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
      }}
      chartConfig={{
        ...chartConfig,
      }}
      width={Dimensions.get('window').width}
      height={220}
      style={chartStyle}
      yAxisSuffix="g"
      decimalPlaces={0}
    />
  );
}

export default StackedBarChart;
