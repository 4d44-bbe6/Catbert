import { View, TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import {
  ALERT_TYPE, Toast,
} from 'react-native-alert-notification';

import { styles } from '../../../styles';

function StockAddScreen({ navigation }) {
  const [newStockName, setNewStockName] = useState('');
  const [newStockValue, setNewStockValue] = useState();

  const saveNew = async () => {
    await fetch('http://localhost:3000/stock/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newStockName,
        value: parseInt(newStockValue, 10),
      }),
    });

    setTimeout(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        position: 'bottom',
        title: 'Voorraad toegevoegd!',
      });
      navigation.push('Stock');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Naam"
        value={newStockName}
        onChangeText={setNewStockName}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Gewicht in gram"
        value={newStockValue && newStockValue.toString()}
        onChangeText={setNewStockValue}
        multiline={false}
        keyboardType="numeric"
        returnKeyType="next"
      />
      <Button onPress={() => saveNew()}>Toevoegen</Button>
    </View>
  );
}

export default StockAddScreen;
