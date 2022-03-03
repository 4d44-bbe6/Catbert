import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { styles } from '../../../styles';

function CatAddScreen() {
  const [newCat, setNewCat] = useState();
  const [addedCat, setAddedCat] = useState(false);

  const saveNew = async () => {
    // await fetch('http://localhost:3000/cats/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: newCat,
    //   }),
    // });

    // setAddedCat(true);
    // setNewCat('');

    const response = await fetch('http://localhost:3000/cats/registerRFID', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCat,
      }),
    });
    console.log(response);
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
      {!addedCat
        ? <Button onPress={() => saveNew()}>Toevoegen</Button>
        : (
          <View style={styles.container}>
            <Text style={styles.text}>Plaats de chip van het huisdier nu tegen de sensor.</Text>
            <Text style={styles.text}>Wachten op validatie van de chip...</Text>
          </View>
        )}
    </View>
  );
}

export default CatAddScreen;
