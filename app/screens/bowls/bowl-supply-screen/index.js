import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyledAdd } from '../../../styles';

const BowlSupplyScreen = ({ navigation }) => {
  <View>
    <Text>Huidige voorraad: 3280g</Text>
    <StyledAdd>

      <AntDesign name="pluscircle" size={24} color="green" />

    </StyledAdd>
  </View>;
};

export default BowlSupplyScreen;
