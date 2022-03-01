/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  View, ScrollView, Pressable, Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';

import { getEntity } from '../../../util';
import BowlAddScreen from '../bowl-add-screen';
import BowlSupplyScreen from '../bowl-supply-screen';
import Item from '../../../components/Item';
import { StyledAdd } from '../../../styles';

const Stack = createNativeStackNavigator();

function Bowls({ navigation }) {
  const [scales, setScales] = useState([]);
  const [cats, setCats] = useState([]);
  const [showScale, toggleScale] = useState(-1);
  const [scaleDayMetrics, setScaleDayMetrics] = useState();
  const [scaleWeekMetrics, setScaleWeekMetrics] = useState();

  const fetchData = async () => {
    const dataScales = await getEntity('scales');
    setScales(dataScales);

    const dataCats = await getEntity('cats');
    setCats(dataCats);
  };

  const fetchMetrics = async () => {
    const metricsLastDay = await fetch('http://localhost:3000/metrics/lastDay/61f2979c9ccf0a042c7667bf', {
      method: 'GET',
    });

    const metricsLastWeek = await fetch('http://localhost:3000/metrics/lastWeek/61f2979c9ccf0a042c7667bf', {
      method: 'GET',
    });

    const metricsDay = await metricsLastDay.json();
    const metricsWeek = await metricsLastWeek.json();

    setScaleDayMetrics(metricsDay.map((metric) => ({
      value: Math.floor(Number(metric.value) + 5),
      timestamp: metric.timestamp,
    })));

    setScaleWeekMetrics(metricsWeek.map((metric) => ({
      value: Math.floor(Number(metric.value) + 5),
      timestamp: metric.timestamp,
    })));
  };

  useEffect(() => {
    fetchData();
    fetchMetrics();
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
              remove
            />
          </Pressable>
          {index === showScale && (
          <>
            <Text>Gewicht afgelopen 24 uur.</Text>
            <LineChart
              scale={scale._id}
              labels={scaleDayMetrics.map((scaleMetric) => `${scaleMetric.timestamp}:00`)}
              data={scaleDayMetrics.map((scaleMetric) => (scaleMetric.value))}
            />
            <Text>Gewicht afgelopen 7 dagen.</Text>
            <LineChart
              scale={scale._id}
              labels={scaleWeekMetrics.map((scaleMetric) => `${scaleMetric.timestamp}`)}
              data={scaleWeekMetrics.map((scaleMetric) => (scaleMetric.value))}
            />
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
