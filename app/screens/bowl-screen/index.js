import {
  SafeAreaView, Dimensions, Text, Button,
} from 'react-native';
import { LineChart, BarChart, StackedBarChart } from 'react-native-chart-kit';
import styled from 'styled-components';

function BowlScreen({ bowl }) {
  return (
    <SafeAreaView>
      <StyledTitle><Text>{bowl.name}</Text></StyledTitle>
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
