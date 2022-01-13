import BowlsContainer from '../containers/bowls-screen';
import CatsContainer from '../containers/cats-screen';
import InfoContainer from '../containers/info-screen';

const components = {
  BowlsContainer,
  CatsContainer,
  InfoContainer,
};

export const mapComponent = (componentName) => components[componentName];
