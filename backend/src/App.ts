import * as express from 'express';
import { Connection, connect, connection } from 'mongoose';
import Mqtt from './Mqtt';
import bodyParser = require('body-parser');

import {
  MONGODB_ATLAS_USER,
  MONGODB_ATLAS_PASSWORD,
  MQTT_SERVER,
} from './config';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initDB();
    new Mqtt(MQTT_SERVER, ['currentWeight', 'currentCat']);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private async initDB(): Promise<Connection> {
    const mongoDB = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/Catbert?retryWrites=true&w=majority`;
    await connect(mongoDB);
    const db = connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error: '));
    return db;
  }
}

export default App;
