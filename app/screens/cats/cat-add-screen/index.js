import styled from 'styled-components';
import { useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../../../styles';

function CatAddScreen() {
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
          <View style={styles.container}>
            <Text style={styles.text}>Plaats de chip van het huisdier nu tegen de sensor.</Text>
            <Text style={styles.text}>Wachten op validatie van de chip...</Text>
          </View>
        )}
    </ScrollView>
  );
}

export default CatAddScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  text: {
    color: colors.textDark,
    marginBottom: 15,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.textLight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'orange',
  },
});

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 100%;
  margin: 12px;
  padding: 2px 15px;
  border: 1px solid orange;
  background-color: #FFFFFF;
`;
