/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';

function BowlAddScreen({ route }) {
  const { locations, cats } = route.params;

  // Dropdown pickers
  const [pickerLocationOpen, setPickerLocationOpen] = useState(false);
  const [pickerLocationValue, setPickerLocationValue] = useState();
  const [pickerCatsOpen, setPickerCatsOpen] = useState(false);
  const [pickerCatsValue, setPickerCatsValue] = useState([]);

  const [newLocation, setNewLocation] = useState();
  const [showAddNewLocation, toggleAddNewLocation] = useState(false);

  const [name, setName] = useState();
  const [addedScale, setAddedScale] = useState(false);

  const addScale = async () => {
    await fetch('http://localhost:3000/scales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        location: newLocation || pickerLocationValue,
        cats:
          pickerCatsValue,
      }),
    });
    setAddedScale(true);
  };

  return (
    <StyledContainer>
      <StyledTextInput
        placeholder="Hoe wil je de voerbak noemen?"
        value={name}
        onChangeText={setName}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
      <Text>Waar staat de voerbak?</Text>

      {locations.length > 0 && (
      <DropDownPicker
        open={pickerLocationOpen}
        value={pickerLocationValue}
        items={locations}
        schema={{
          label: 'name',
          value: '_id',
        }}
        setOpen={setPickerLocationOpen}
        setValue={setPickerLocationValue}
        setItems={setPickerLocationValue}
        zIndex={2000}
        zIndexInverse={2000}
      />
      )}

      {!showAddNewLocation ? (
        <Button onPress={() => toggleAddNewLocation(!showAddNewLocation)}>
          Of voeg een nieuwe lokatie toe..
        </Button>
      ) : (
        <StyledTextInput
          placeholder="Voeg een nieuwe lokatie toe"
          value={newLocation}
          onChangeText={setNewLocation}
          multiline={false}
          keyboardType="default"
          returnKeyType="next"
        />
      )}

      <Text>Welke katten eten uit deze voerbak?</Text>
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
