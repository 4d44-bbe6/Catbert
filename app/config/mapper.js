import HomeScreenContainer from '../containers/home-screen';
import BowlsContainer from '../containers/bowls-screen';

const components = {
  HomeScreenContainer,
  BowlsContainer,
};

export const mapComponent = (componentName) => components[componentName];
