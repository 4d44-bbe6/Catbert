import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigator/StackNavigator';

const DATA = [
  {
    id: '61bf39cba5c5e88791ea926e',
    name: 'Tweede kattenbak',
    description: 'Omschrijving voor de Tweede kattenbak',
    location: 'Bijkeuken',
  },
  {
    id: '61bf39cca5c5e88791ea9270',
    name: 'Tweede kattenbak',
    description: 'Omschrijving voor de Tweede kattenbak',
    location: 'Bijkeuken',
  },
  {
    id: '61c06f50e8397182815cd9a8',
    name: 'Derde kattenbak',
    description: 'Omschrijving voor de derde kattenbak',
    location: 'Bijkeuken',
  },
];

function App() {
  return (
    <NavigationContainer>
      <StackNavigator data={DATA} />
    </NavigationContainer>
  );
}

export default App;
