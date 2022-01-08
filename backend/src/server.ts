import App from './App';
import { PORT } from './config';
import ScalesController from './scales/scales.controller';
import LocationsController from './locations/locations.controller';
import CatsController from './cats/cats.controller';

const app = new App(
  [new ScalesController(), new LocationsController(), new CatsController()],
  PORT,
);
app.listen();
