import App from './App';
import ScalesController from './scales/scales.controller';
import CatsController from './cats/cats.controller';
import MetricsController from './metrics/metrics.controller';
import StockController from './stock/stock.controller';

const app = App.getInstance([
  new ScalesController(),
  new CatsController(),
  new MetricsController(),
  new StockController(),
]);
app.listen();
