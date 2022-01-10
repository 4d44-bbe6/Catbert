/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';

import { getEntity } from '../../util';
import BowlAddScreen from '../bowl-add-screen';

const Stack = createNativeStackNavigator();

function Bowls({ navigation }) {
  const [scales, setScales] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cats, setCats] = useState([]);
  const [showScale, toggleScale] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const dataScales = await getEntity('scales');
      setScales(dataScales);

      const dataLocations = await getEntity('locations');
      setLocations(dataLocations);

      const dataCats = await getEntity('cats');
      setCats(dataCats);
    }

    fetchData();
  }, []);
  const renderBowls = () => (
    <ScrollView>
      {scales.length > 0 && scales.map((scale, index) => (
        <View key={scale._id}>
          <View key={scale._id}>
            <Pressable onPress={() => (showScale === index ? toggleScale(-1) : toggleScale(index))}>
              <StyledHeader>{scale.name}</StyledHeader>
            </Pressable>
          </View>
          {index === showScale && (
          <>
            <LineChart scale={scale._id} />
            <PieChart scale={scale._id} />
          </>
          )}
        </View>

      ))}

    </ScrollView>
  );

  return (
    <ScrollView>
      {renderBowls()}
      <StyledHeaderAdd>
        {locations?.length > 0 && (
        <Pressable onPress={() => {
          navigation.push('addBowl', {
            locations,
          });
        }}
        >
          <AntDesign name="pluscircle" size={24} color="orange" />
        </Pressable>
        )}

      </StyledHeaderAdd>
    </ScrollView>
  );
}

function BowlsScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator
        screenOptions={{
          // headerShown: true,
        }}
      >
        <Stack.Screen
          name="Bowls"
          component={Bowls}
        />
        <Stack.Screen
          name="addBowl"
          options={{
            title: 'Toevoegen voerbak',
          }}
          component={BowlAddScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BowlsScreen;

const StyledHeader = styled.Text`
  margin: 5px 15px;
  padding: 5px;
  border-radius: 5px;
  background-color: #cFcFcF;
`;

const StyledHeaderAdd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
  margin-right: 15px;
`;
