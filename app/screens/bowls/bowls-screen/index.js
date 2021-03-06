import { useEffect, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { getEntity } from '../../../util';
import BowlAddScreen from '../bowl-add-screen';
import BowlSupplyScreen from '../bowl-supply-screen';

import AddButton from '../../../components/elements/AddButton';
import { styles, theme } from '../../../styles';

// import Item from '../../../components/Item';
import BowlItem from '../bowl-screen';

const Stack = createNativeStackNavigator();

function Bowls({ navigation }) {
  const [scales, setScales] = useState([]);
  const [cats, setCats] = useState([]);

  const [scaleDayMetrics, setScaleDayMetrics] = useState();
  const [scaleWeekMetrics, setScaleWeekMetrics] = useState();
  const [amountEaten, setAmountEaten] = useState([]);
  const [currentWeight, setCurrentWeight] = useState(0.0);

  const fetchData = async () => {
    const dataScales = await getEntity('scales');
    setScales(dataScales);

    const dataCats = await getEntity('cats');
    setCats(dataCats);
  };

  const fetchMetrics = async () => {
    const currentWeightData = await fetch('http://192.168.178.4:3000/metrics/currentWeight', {
      method: 'GET',
    });

    const metricsLastDayData = await fetch(
      'http://192.168.178.4:3000/metrics/lastDay/61f2979c9ccf0a042c7667bf',
      {
        method: 'GET',
      },
    );

    const metricsLastWeekData = await fetch(
      'http://192.168.178.4:3000/metrics/lastWeek/61f2979c9ccf0a042c7667bf',
      {
        method: 'GET',
      },
    );

    const amountEatenByCatsData = await fetch('http://192.168.178.4:3000/cats/', {
      method: 'GET',
    });

    const metricsLastDay = await metricsLastDayData.json();
    const metricsLastWeek = await metricsLastWeekData.json();
    const amountEatenByCats = await amountEatenByCatsData.json();

    setCurrentWeight(await currentWeightData.json());

    setScaleDayMetrics(
      metricsLastDay.map((metric) => ({
        value: Math.floor(Number(metric.value) + 5),
        timestamp: metric.timestamp,
      })),
    );

    setScaleWeekMetrics(
      metricsLastWeek.map((metric) => ({
        value: Math.floor(Number(metric.value) + 5),
        timestamp: metric.timestamp,
      })),
    );

    setAmountEaten(amountEatenByCats);
  };

  const removeScale = async (id) => {
    await fetch(`http://192.168.178.4:3000/scales/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTimeout(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        position: 'bottom',
        title: 'Voerbak verwijderd!',
      });
      fetchData();
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    fetchMetrics();
  }, []);

  return (
    <ScrollView>
      <View style={styles.column}>
        {scales.length > 0 ? (
          scales.map((scale) => (
            <View key={scale._id}>
              <BowlItem
                item={scale}
                status={currentWeight ? `${parseInt(currentWeight.value, 10)} gram` : ''}
                icon={{
                  name: 'bowl',
                }}
                remove={removeScale}
                metrics={{
                  day: scaleDayMetrics,
                  week: scaleWeekMetrics,
                }}
                cats={amountEaten}
              />
            </View>
          ))
        ) : (
          <View style={{ marginTop: '5%' }}>
            <Pressable
              onPress={() => {
                navigation.push('addBowl', {
                  cats,
                });
              }}>
              <AddButton />
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function BowlsScreen() {
  return (
    <NavigationContainer theme={theme} independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Bowls"
          component={Bowls}
          options={{
            title: 'Voerbak',
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
