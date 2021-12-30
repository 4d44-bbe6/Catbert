import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './tabs-navigation';

const Stack = createStackNavigator();
function Root({
  headerProps,
  tabsProps,
}) {
  return (
    <Stack.Navigator
      initialRouteName={tabsProps.initialRouteName}
      screenOptions={{
        headerMode: 'float',
      }}
    >
      <Stack.Screen
        name="Tabs"
        options={headerProps}
      >
        {() => (
          <Tabs
            TabBarComponent={tabsProps.TabBarComponent}
            initialRouteName={tabsProps.initialRouteName}
            routes={tabsProps.routes}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
export default Root;
