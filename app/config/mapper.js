import HomeScreenContainer from '../containers/home-screen';
import BowlsContainer from '../containers/bowls-screen';
import CatsContainer from '../containers/cats-screen';

const components = {
  HomeScreenContainer,
  BowlsContainer,
  CatsContainer,
};

export const mapComponent = (componentName) => components[componentName];
