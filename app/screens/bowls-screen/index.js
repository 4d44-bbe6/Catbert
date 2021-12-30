import { Text, View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import LineChart from '../../components/charts/LineChart';
import StackedBarChart from '../../components/charts/StackedBarChart';

import { bowls } from '../../config/data/initial-state.json';

console.log(bowls);

function BowlsScreen() {
  const renderBowls = () => bowls.map((bowl) => (
    <View key={bowl.id}>
      <Pressable
        onPressIn={() => {
          console.log('toggle Bowl');
        }}
      >
        <BowlContainer key={bowl.id}>
          <Text>{bowl.name}</Text>
        </BowlContainer>
      </Pressable>
      <LineChart />
      <StackedBarChart />
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
  margin: 2px 0;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #cFcFcF;
`;
