/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

function BowlAddScreen() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, selectLocation] = useState();
  const [showAddNewLocation, toggleAddNewLocation] = useState(false);
  const [newLocation, setNewLocation] = useState(null);

  /**
   * Retrieve all locations from backend
   */
  const getLocations = async () => {
    const result = await fetch('http://localhost:3000/locations/', {
      method: 'GET',
    });
    const locationsData = await result.json();
    setLocations(locationsData);
  };

  useEffect(() => {
    getLocations();
  }, []);

  /**
   * Add Location to backend
   * @param {string} location
   */
  const addLocation = async (location) => {
    await fetch('http://localhost:3000/locations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: location,
      }),
    });
    toggleAddNewLocation(false);
  };

  return (
    <StyledContainer>
      <Text>Waar staat de voerbak?</Text>
      {locations.length > 0 && locations.map((location, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledButtonContainer key={index}>
          <Button
            color={selectedLocation === location._id ? 'green' : 'orange'}
            mode="contained"
            onPress={() => selectLocation(location._id)}
          >
            {location.name}
          </Button>
        </StyledButtonContainer>
      ))}
      {!showAddNewLocation ? (
        <Button onPress={() => toggleAddNewLocation(!showAddNewLocation)}>
          Of voeg een nieuwe lokatie toe..
        </Button>
      ) : (
        <>
          <StyledTextInput placeholder="Voeg een nieuwe lokatie toe" value={newLocation} onChangeText={setNewLocation} />
          <Button onPress={() => addLocation(newLocation)}>Voeg toe</Button>
        </>
      )}

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

const StyledButtonContainer = styled.View`
  margin: 10px 60px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 100%;
  margin: 12px;
  padding: 2px 15px;
  border: 1px solid orange;
  background-color: #FFFFFF;
`;
