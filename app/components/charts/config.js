export const chartStyle = {
  margin: 10,
};

export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#fb8c00',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '2',
    strokeWidth: '5',
    stroke: '#ffa726',
  },
  barPercentage: '.5',
};
