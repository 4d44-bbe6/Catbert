import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Root } from 'react-native-alert-notification';
import MasterScreenContainer from './master-screen';

function AppContainer() {
  return (
    <Root
      toastConfig={{
        autoClose: 1000,
        position: 'bottom',
      }}
    >
      <PaperProvider>
        <NavigationContainer>
          <MasterScreenContainer />
        </NavigationContainer>
      </PaperProvider>
    </Root>
  );
}

export default AppContainer;
