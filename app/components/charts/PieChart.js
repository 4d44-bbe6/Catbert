import { Dimensions } from 'react-native';
import { PieChart as PC } from 'react-native-chart-kit';
import { chartConfig, chartStyle } from './config';

const data = [
  {
    name: 'g - Ortiz',
    Gegeten: 124,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'g - Solo',
    Gegeten: 40,
    color: 'rgb(0, 255, 0)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'g - Nano',
    Gegeten: 60,
    color: 'rgb(255, 0, 0)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

function PieChart() {
  return (
    <PC
      data={data}
      accessor="Gegeten"
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
