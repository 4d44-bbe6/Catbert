/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';

function BowlAddScreen({ route }) {
  const { cats } = route.params;

  const [addedScale, setAddedScale] = useState(false);
  // Dropdown pickers
  const [pickerCatsOpen, setPickerCatsOpen] = useState(false);
  const [pickerCatsValue, setPickerCatsValue] = useState([]);

  const [scaleName, setScaleName] = useState();
  const [scaleAddress, setScaleAddress] = useState();

  const addScale = async ({ navigation }) => {
    await fetch('http://localhost:3000/scales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: scaleName,
        cats:
          pickerCatsValue,
      }),
    });
    setAddedScale(true);
    setScaleName('');
    setScaleAddress('');
    setTimeout(() => {
      navigation.push('Cats');
    }, 1000);
  };

  return (
    <StyledContainer>
      <StyledTextInput
        placeholder="Hoe wil je de voerbak noemen?"
        value={scaleName}
        onChangeText={setScaleName}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <StyledTextInput
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
      {addedScale !== true
        ? <Button onPress={() => addScale()}>Voeg een voerbak toe toe</Button>
        : <Text>Je voerbak is toegevoegd.</Text>}
    </StyledContainer>
  );
}

export default BowlAddScreen;

const StyledContainer = styled.View`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 100%;
  margin: 12px;
  padding: 2px 15px;
  border: 1px solid orange;
  background-color: #FFFFFF;
`;
