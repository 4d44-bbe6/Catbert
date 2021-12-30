import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import MasterScreenContainer from './master-screen';

function AppContainer() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MasterScreenContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default AppContainer;
