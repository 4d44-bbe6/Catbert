import { Dimensions } from 'react-native';
import { PieChart as PC } from 'react-native-chart-kit';
import { chartConfig, chartStyle } from './config';

function PieChart({ data }) {
  return (
    <PC
      data={data}
      accessor="amount"
      chartConfig={chartConfig}
      chartStyle={chartStyle}
      height={220}
      width={Dimensions.get('window').width}
      backgroundColor="#fb8c00"
      legendFontColor="#FFFFFF"
      absolute
    />
  );
}

export default PieChart;
