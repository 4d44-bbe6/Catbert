import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';

function CatAddScreen({ navigation }) {
  const [newCat, setNewCat] = useState();

  const saveNew = async () => {
    const result = await fetch('http://localhost:3000/cats/', {
      method: 'POST',

    });
  };
  return (
    <ScrollView>
      <Text>Voeg een kat toe</Text>
      <StyledTextInput
        placeholder="Voeg een nieuw huisdier toe"
        value={newCat}
        onChangeText={setNewCat}
        multiline={false}
        keyboardType="default"
        returnKeyType="next"
      />
    </ScrollView>
  );
}

export default CatAddScreen;

const StyledTextInput = styled.TextInput`
  height: 40px;
  width: 100%;
  margin: 12px;
  padding: 2px 15px;
  border: 1px solid orange;
  background-color: #FFFFFF;
`;
