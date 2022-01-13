import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { StyledTextInput, StyledText } from '../../styles';

function CatAddScreen({ navigation }) {
  const [newCat, setNewCat] = useState();
  const [addedCat, setAddedCat] = useState(false);

  const saveNew = async () => {
    await fetch('http://localhost:3000/cats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCat,
      }),
    });

    setAddedCat(true);
    setNewCat('');

    // setTimeout(() => {
    //   navigation.push('Cats');
    // }, 1000);
  };

  return (
    <ScrollView>
      <StyledTextInput
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
          <View>
            <StyledText>Plaats de chip van het huisdier nu tegen de sensor.</StyledText>
            <StyledText>Wachten op validatie van de chip...</StyledText>
          </View>
        )}
    </ScrollView>
  );
}

export default CatAddScreen;
