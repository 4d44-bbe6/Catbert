/* eslint-disable react/no-children-prop */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import BowlsScreen from '../screens/Bowls';
import BowlScreen from '../screens/Bowl';

const Stack = createNativeStackNavigator();

class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={() => (
          {
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: true,
            presentation: 'card',
            ...TransitionPresets.SlideFromRightIOS,
          }
        )}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen name="Home" children={() => <HomeScreen data={this.data} />} />
        <Stack.Screen name="Bowls" component={BowlsScreen} />
        <Stack.Screen name="Bowl" component={BowlScreen} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;

StackNavigator.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
