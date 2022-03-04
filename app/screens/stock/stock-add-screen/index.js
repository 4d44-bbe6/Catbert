import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native-paper';

import { styles } from '../../../styles';

function StockAddScreen({ navigation }) {
  const [newStockName, setNewStockName] = useState('');
  const [newStockValue, setNewStockValue] = useState(0);
  const [addedStock, setAddedStock] = useState();

  const clearInput = () => {
    setAddedStock(true);
    setNewStockValue(0);
    setNewStockName('');
  };

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

    clearInput();
    setTimeout(() => {
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
      {!addedStock ? <Button onPress={() => saveNew()}>Toevoegen</Button> : <Text>Je voorraad is toegevoegd.</Text>}
    </View>
  );
}

export default StockAddScreen;
