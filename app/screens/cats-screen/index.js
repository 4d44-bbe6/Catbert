/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  View, Pressable, ScrollView, Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatAddScreen from '../cat-add-screen';
import { getEntity } from '../../util';

const Stack = createNativeStackNavigator();

function Cats({ navigation }) {
  const [cats, setCats] = useState([]);

  const fetchData = async () => {
    const dataCats = await getEntity('cats');
    setCats(dataCats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCats = () => (
    <ScrollView>
      {cats.length > 0 && cats.map((cat) => (
        <View key={cat._id}>
          <Pressable>
            <Text>{cat.name}</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
  return (
    <ScrollView>
      {renderCats()}
      <StyledHeaderAdd>

        <Pressable onPress={() => {
          navigation.push('addCat', {
            cats,
          });
        }}
        >
          <AntDesign name="pluscircle" size={24} color="orange" />
        </Pressable>

      </StyledHeaderAdd>
    </ScrollView>
  );
}

function CatsScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Huisdieren"
          component={Cats}
        />
        <Stack.Screen
          name="addCat"
          options={{
            title: 'Toevoegen huisdier',
          }}
          component={CatAddScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CatsScreen;

const StyledHeaderAdd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
  margin-right: 15px;
`;
