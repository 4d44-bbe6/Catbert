import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

function BowlsScreen({ data }) {
  const navigation = useNavigation();
  const renderBowls = () => data.map((bowl) => (
    <Pressable
      key={bowl.id}
      onPressIn={() => {
        navigation.navigate('Bowl', {
          bowl,
        });
      }}
    >
      <BowlContainer>
        <Text>{bowl.name}</Text>
      </BowlContainer>
    </Pressable>
  ));

  return (
    <SafeAreaView>
      {renderBowls()}
    </SafeAreaView>
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

BowlsScreen.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
