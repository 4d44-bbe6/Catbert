import App from './App';
import { PORT } from './config';
import ScalesController from './scales/scales.controller';
import CatsController from './cats/cats.controller';
import MetricsController from './metrics/metrics.controller';

const app = new App(
  [new ScalesController(), new CatsController(), new MetricsController()],
  PORT,
);
app.listen();
