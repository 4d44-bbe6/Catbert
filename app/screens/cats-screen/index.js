/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  View, Pressable, ScrollView, StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatAddScreen from '../cat-add-screen';
import Item from '../../components/Item';
import { getEntity } from '../../util';
import { StyledAdd } from '../../styles';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

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
    <ScrollView contentContainerStyle={styles.center}>
      {cats.length > 0 && cats.map((cat) => (
        <View key={cat._id}>
          <Item name={cat.name} status="Laatst gezien: 13:44" icon={{ name: 'cat' }} />
        </View>
      ))}

    </ScrollView>
  );
  return (
    <ScrollView>
      <View>
        {renderCats()}
        <StyledAdd>
          <Pressable onPress={() => {
            navigation.push('addCat', {
              cats,
            });
          }}
          >
            <AntDesign name="pluscircle" size={24} color="green" />
          </Pressable>

        </StyledAdd>
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
