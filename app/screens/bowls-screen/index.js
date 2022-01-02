import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import LineChart from '../../components/charts/LineChart';
// import StackedBarChart from '../../components/charts/StackedBarChart';
import PieChart from '../../components/charts/PieChart';

import { bowls } from '../../config/data/initial-state.json';

function BowlsScreen() {
  const renderBowls = () => bowls.map((bowl) => (
    <View key={bowl.id}>

      <BowlContainer key={bowl.id}>
        <Text>{bowl.name}</Text>
      </BowlContainer>

      <LineChart />
      <PieChart />
    </View>
  ));

  return (
    <View>
      {renderBowls()}
    </View>
  );
}

export default BowlsScreen;

const BowlContainer = styled.View`
  margin: 5px 15px;
  padding: 5px;
  border-radius: 5px;
  background-color: #cFcFcF;
`;
