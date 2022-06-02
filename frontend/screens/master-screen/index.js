/* eslint-disable react/jsx-props-no-spreading */
import RootNavigation from '../../components/navigation/root-navigation';
import TabBar from '../../components/navigation/tab-bar';
import AppBar from '../../components/app-bar';
import { config } from '../../config';
import { mapComponent } from '../../config/mapper';

const COMMON_ICON_SIZE = 25;

function MasterScreen() {
  const prepareRoutes = (routes) => routes.map((route) => ({
    ...route,
    component: mapComponent(route.component),
  }));

  const tabsRoutes = prepareRoutes(config.routes.tabs)
    .sort((routeA, routeB) => routeA.order - routeB.order);

  const tabsInitialRouteName = tabsRoutes.find((route) => route.defaultTabs).key;

  function TabBarComponent(props) {
    return (
      <TabBar
        iconSize={COMMON_ICON_SIZE}
        {...props}
      />
    );
  }

  return (
    <RootNavigation
      headerProps={{
        header: () => (
          <AppBar />
        ),
        headerShown: true,
      }}
      tabsProps={{
        TabBarComponent,
        initialRouteName: tabsInitialRouteName,
        routes: tabsRoutes,
      }}
    />
  );
}

export default MasterScreen;
