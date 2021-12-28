import { SafeAreaView, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

function BowlScreen({ route }) {
  const { bowl } = route.params;
  console.log(bowl.name);

  const renderlastDay = () => {
    const result = [];

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes().toString();

    for (let i = hours; i > (hours - 6); i -= 1) {
      result.push(`${i}:${minutes}`);
    }

    result.reverse();
    return result;
  };

  return (
    <SafeAreaView>
      <Text>{bowl.name}</Text>
      <LineChart
        data={{
          labels: renderlastDay(),
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
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisSuffix="g"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          margin: 10,
        }}
      />
    </SafeAreaView>
  );
}

export default BowlScreen;
