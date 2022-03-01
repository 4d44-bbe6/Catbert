import App from './App';
import { PORT } from './config';
import ScalesController from './scales/scales.controller';
import CatsController from './cats/cats.controller';
import MetricsController from './metrics/metrics.controller';
import StockController from './stock/stock.controller';

const app = new App(
  [
    new ScalesController(),
    new CatsController(),
    new MetricsController(),
    new StockController(),
  ],
  PORT,
);
app.listen();
