import { useState } from 'react';
import { View, Text } from 'react-native';
import {
  ALERT_TYPE, Toast,
} from 'react-native-alert-notification';
import { Button, TextInput } from 'react-native-paper';
import { styles } from '../../../styles';

function CatAddScreen({ navigation }) {
  const [newCat, setNewCat] = useState();
  const [addingCat, toggleAddingCat] = useState(false);
  const [gettingRFID, toggleGettingRFID] = useState(false);
  const [latestRFID, setLatestRFID] = useState();

  const saveNew = async () => {
    await fetch('http://localhost:3000/cats/registerRFID/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCat,
      }),
    });

    setTimeout(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        position: 'bottom',
        title: 'Kat toegevoegd!',
      });
      navigation.push('Cats');
    }, 1000);
  };

  const getRFID = async () => {
    toggleGettingRFID(true);
    const result = await fetch('http://localhost:3000/metrics/latest', {
      method: 'GET',
    });
    const dataLatestRFID = await result.json();

    setTimeout(() => {
      setLatestRFID(dataLatestRFID.value);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Naam"
        value={newCat}
        onChangeText={setNewCat}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />

      <Button onPress={() => {
        toggleAddingCat(true);
        getRFID();
      }}
      >
        Chip registreren
      </Button>
      {addingCat && (
      <View style={styles.container}>
        <Text style={styles.text}>Plaats de chip van het huisdier nu tegen de sensor en druk op toevoegen</Text>
        {gettingRFID && <Text>Wachten op aanwezige chip...</Text>}
        {latestRFID && (
        <Text>
          Chip gedetecteerd met id:
          {' '}
          {latestRFID}
        </Text>
        )}
        <Button onPress={() => saveNew()}>Toevoegen</Button>
      </View>
      )}

    </View>
  );
}

export default CatAddScreen;
