/* eslint-disable no-underscore-dangle */
import { ScrollView, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Item from '../../../components/Item';
import { getEntity } from '../../../util';
import StockAddScreen from '../stock-add-screen';
import AddButton from '../../../components/elements/AddButton';
import { styles } from '../../../styles';

const Stack = createNativeStackNavigator();

function Stock({ navigation }) {
  const [stock, setStock] = useState([]);

  const fetchData = async () => {
    const dataStock = await getEntity('stock');
    setStock(dataStock);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeBowl = async (id) => {
    await fetch(`http://192.168.178.4:3000/stock/${id}`, {
      method: 'DELETE',
    });

    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Voorraad verwijderd!',
    });
    fetchData();
  };

  return (
    <ScrollView>
      <View style={styles.column}>
        {stock.length > 0 &&
          stock.map((item) => (
            <View key={item._id}>
              <Item
                item={item}
                status={`${item.value} gram`}
                icon={{ name: 'warehouse' }}
                remove={removeBowl}
              />
            </View>
          ))}
      </View>
      <Pressable
        onPress={() => {
          navigation.push('addStock');
        }}>
        <AddButton />
      </Pressable>
    </ScrollView>
  );
}

function StockScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Stock"
          component={Stock}
          options={{ title: 'Overzicht huidige voorraad' }}
        />
        <Stack.Screen
          name="addStock"
          component={StockAddScreen}
          options={{ title: 'Voeg een nieuwe voorraad toe' }}
        />
        {/* <Stack.Screen name="StockItem" component={StockItemScreen} options={{ title: 'Pas je huidige voorraad aan' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StockScreen;
