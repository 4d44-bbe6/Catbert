/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import CatAddScreen from '../cat-add-screen';
import Item from '../../../components/Item';
import { getEntity } from '../../../util';

import AddButton from '../../../components/elements/AddButton';
import { styles } from '../../../styles';

const Stack = createNativeStackNavigator();

function Cats({ navigation }) {
  const [cats, setCats] = useState([]);

  const fetchData = async () => {
    const dataCats = await getEntity('cats');
    setCats(dataCats);
  };

  const removeCat = async (id) => {
    await fetch(`http://192.168.178.4:3000/cats/${id}`, {
      method: 'DELETE',
    });

    setTimeout(() => {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        position: 'bottom',
        title: 'Kat verwijderd!',
      });

      fetchData();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.column}>
        {cats.length > 0 &&
          cats.map((cat) => {
            const lastSeen = new Date(cat.lastUpdated);
            return (
              <View key={cat._id}>
                <Item
                  item={cat}
                  status={`Laatst gezien: ${lastSeen.toLocaleDateString(
                    'NL-nl',
                  )} - ${lastSeen.toLocaleTimeString('nl-NL')}`}
                  icon={{ name: 'cat' }}
                  remove={removeCat}
                />
              </View>
            );
          })}
      </View>
      <View>
        <Pressable
          onPress={() => {
            navigation.push('addCat', {
              cats,
            });
          }}>
          <AddButton />
        </Pressable>
      </View>
    </ScrollView>
  );
}

function CatsScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Cats"
          component={Cats}
          options={{
            title: 'Overzicht huisdieren',
          }}
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
