import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
function Tabs({
  TabBarComponent,
  initialRouteName,
  routes,
}) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={(props) => <TabBarComponent {...props} />}
    >
      {routes.map((route) => (
        <Tab.Screen
          component={route.component}
          key={route.key}
          name={route.name}
          options={{
            icon: route.icon,
            title: route.description,
            tabBarButton: route.showTab,
          }}
        />
      ))}

    </Tab.Navigator>
  );
}

export default Tabs;
