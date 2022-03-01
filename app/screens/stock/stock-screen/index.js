/* eslint-disable no-underscore-dangle */
import {
  ScrollView, View, Text, Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Item from '../../../components/Item';
import { getEntity } from '../../../util';
import StockAddScreen from '../stock-add-screen';

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

  return (
    <ScrollView>
      {stock.length > 0 ? stock.map((item) => (
        <View key={item._id}>
          <Item name={item.name} status={`${item.value} gram`} icon={{ name: 'warehouse' }} />
        </View>
      )) : (
        <View>
          <Text>Voeg een voorraad toe</Text>
          <Pressable onPress={() => {
            navigation.push('addStock');
          }}
          >
            <AntDesign name="pluscircle" size={24} color="green" />
          </Pressable>
        </View>
      )}

    </ScrollView>
  );
}

function StockScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen name="Stock" component={Stock} options={{ title: 'Overzicht huidige voorraad' }} />
        <Stack.Screen name="addStock" component={StockAddScreen} options={{ title: 'Voeg een nieuwe voorraad toe' }} />
        {/* <Stack.Screen name="StockItem" component={StockItemScreen} options={{ title: 'Pas je huidige voorraad aan' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StockScreen;
