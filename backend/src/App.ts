import * as express from 'express';
import { Connection, connect, connection } from 'mongoose';
import Mqtt from './Mqtt';
import { PORT } from './config';
import bodyParser = require('body-parser');

import {
  MONGODB_ATLAS_USER,
  MONGODB_ATLAS_PASSWORD,
  MQTT_SERVER,
} from './config';

class App {
  private static instance: App;
  private app: express.Application;

  private constructor(controllers) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initDB();
    this.initMqtt();
  }

  public static getInstance(controllers): App {
    if (!App.instance) {
      App.instance = new App(controllers);
    }

    return App.instance;
  }

  private initMqtt(): void {
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
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }

  private async initDB(): Promise<Connection> {
    const mongoDB = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/?retryWrites=true&w=majority`;
    await connect(mongoDB);
    const db = connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error: '));
    return db;
  }
}

export default App;
