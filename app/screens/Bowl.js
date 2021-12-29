import {
  SafeAreaView, Dimensions, Text, Button,
} from 'react-native';
import { LineChart, BarChart, StackedBarChart } from 'react-native-chart-kit';
import styled from 'styled-components';

function BowlScreen({ route }) {
  const { bowl } = route.params;

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const chartStyle = {
    margin: 10,
    paddingBottom: 10,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  };

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
    <SafeAreaView>
      <StyledTitle><Text>{bowl.name}</Text></StyledTitle>
      <LineChart
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

      {/* <BarChart
        style={chartStyle}
        data={{
          labels: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
          datasets: [
            {
              data: [
                Math.random() * 100,
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
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      /> */}

      <StackedBarChart
        hideLegend
        data={{
          labels: ['Ortiz', 'Solo', 'Nano'],
          legend: ['Ortiz', 'Solo', 'Nano'],
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

      <Button title="Voerbak verwijderen" onPress={() => console.log('Verwijderen')} color="#FF0000" />
    </SafeAreaView>
  );
}

export default BowlScreen;

const StyledTitle = styled.View`
  margin: 10px;
`;
