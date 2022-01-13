/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  View, ScrollView, Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';

import { getEntity } from '../../util';
import BowlAddScreen from '../bowl-add-screen';
import BowlSupplyScreen from '../bowl-supply-screen';
import Item from '../../components/Item';
import { StyledAdd } from '../../styles';

const Stack = createNativeStackNavigator();

function Bowls({ navigation }) {
  const [scales, setScales] = useState([]);
  const [cats, setCats] = useState([]);
  const [showScale, toggleScale] = useState(-1);

  const fetchData = async () => {
    const dataScales = await getEntity('scales');
    setScales(dataScales);

    const dataCats = await getEntity('cats');
    setCats(dataCats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderBowls = () => (
    <ScrollView>
      {scales.length > 0 && scales.map((scale, index) => (
        <View key={scale._id}>
          <Pressable onPress={() => (showScale === index ? toggleScale(-1) : toggleScale(index))}>
            <Item
              name={scale.name}
              status="Huidig gewicht: 193g"
              icon={{
                name: 'bowl',
              }}
            />
          </Pressable>
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
      <StyledAdd>
        <Pressable onPress={() => {
          navigation.push('addBowl', {
            cats,
          });
        }}
        >
          <AntDesign name="pluscircle" size={24} color="green" />
        </Pressable>
      </StyledAdd>
    </ScrollView>
  );
}

function BowlsScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Bowls"
          component={Bowls}
          options={{
            title: 'Overzicht voerbakken',
          }}
        />
        <Stack.Screen
          name="addBowl"
          options={{
            title: 'Toevoegen voerbak',
          }}
          component={BowlAddScreen}
        />
        <Stack.Screen
          name="bowlSupply"
          options={{
            title: 'Huidige voorraad kattenvoer',
          }}
          component={BowlSupplyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BowlsScreen;
