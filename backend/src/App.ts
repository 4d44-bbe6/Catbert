import * as express from 'express';
import * as mqtt from 'mqtt';
import { Connection, connect, connection } from 'mongoose';
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
    this.initMqtt();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private async initDB(): Promise<Connection> {
    const mongoDB = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await connect(mongoDB);
    const db = connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error: '));
    return db;
  }

  private async initMqtt() {
    const host = MQTT_SERVER;
    const port = `1883`;
    const connectUrl = `mqtt://${host}:${port}`;
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    const topics = ['home/catbert/currentWeight', 'home/catbert/currentCat'];
    client.on('connect', () => {
      console.log('Connected with MQTT server');
      topics.forEach((topic) => {
        client.subscribe(topic, () => {
          console.log(`Subscribe to topic '${topic}`);
        });
      });

      client.on('message', (topics, payload) => {
        console.log('Received message', topics, payload.toString());
      });
    });
  }
}

export default App;
