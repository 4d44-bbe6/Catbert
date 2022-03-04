import { View, Text } from 'react-native';

import { styles } from '../../styles';

function InfoScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Catbert</Text>
        <Text>Auteur: Jeroen van der Schaaf</Text>
        <Text>In opdracht van: NHL Stenden - HBO ICT Flex</Text>
      </View>
    </View>
  );
}

export default InfoScreen;
