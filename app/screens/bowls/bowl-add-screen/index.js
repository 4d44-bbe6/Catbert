/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { View, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { styles } from '../../../styles';

function BowlAddScreen({ route, navigation }) {
  const { cats } = route.params;

  const [pickerCatsOpen, setPickerCatsOpen] = useState(false);
  const [pickerCatsValue, setPickerCatsValue] = useState([]);

  const [scaleName, setScaleName] = useState();
  const [scaleAddress, setScaleAddress] = useState();

  const addScale = async () => {
    await fetch('http://192.168.178.4:3000/scales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: scaleName,
        cats: pickerCatsValue,
      }),
    });

    setTimeout(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        position: 'bottom',
        title: 'Voorraad toegevoegd!',
      });
      navigation.push('Bowls');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Hoe wil je de voerbak noemen?"
        value={scaleName}
        onChangeText={setScaleName}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="Wat is het IP-adres van de weegschaal?"
        value={scaleAddress}
        onChangeText={setScaleAddress}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <DropDownPicker
        open={pickerCatsOpen}
        value={pickerCatsValue}
        items={cats}
        schema={{
          label: 'name',
          value: '_id',
        }}
        setOpen={setPickerCatsOpen}
        setValue={setPickerCatsValue}
        setItems={setPickerCatsValue}
        multiple
        min={0}
        max={10}
        zIndex={1000}
        zIndexInverse={1000}
        translation={{
          PLACEHOLDER: 'Welke katten hebben toegang?',
          SELECTED_ITEMS_COUNT_TEXT: '{count} geselecteerd.',
        }}
      />
      <Button onPress={() => addScale()}>Voeg een voerbak toe toe</Button>
    </View>
  );
}

export default BowlAddScreen;
