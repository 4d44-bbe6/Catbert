import { View, Text, Image } from 'react-native';
import { styles } from '../../styles';

function InfoScreen() {
  return (
    <View style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%', marginBottom: '5%',
    }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        // eslint-disable-next-line global-require
        source={require('../../assets/Catbert.png')}
      />
      <View style={styles.textContainer}>
        <Text>Catbert</Text>
        <Text>Auteur: Jeroen van der Schaaf</Text>
        <Text>In opdracht van: NHL Stenden - HBO ICT Flex</Text>
      </View>

      <View style={styles.textContainer}>
        <Text>
          Catbert is de app die samen met de slimme voerbak het mogelijk maakt het eetpatroon van je katten te monitoren en je vooraad bij te houden.
        </Text>
      </View>
    </View>
  );
}

export default InfoScreen;
