import BowlsContainer from '../containers/bowls-screen';
import CatsContainer from '../containers/cats-screen';
import StockContainer from '../containers/stock-screen';
import InfoContainer from '../containers/info-screen';

const components = {
  BowlsContainer,
  CatsContainer,
  StockContainer,
  InfoContainer,
};

export const mapComponent = (componentName) => components[componentName];
