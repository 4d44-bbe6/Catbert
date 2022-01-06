import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mqqt from 'mqtt';
import { Connection, connect, connection } from 'mongoose';
import router from './routes/';
import { Express } from 'express-serve-static-core';

dotenv.config();

class App {
  public express: Express;
  public db: Promise<Connection>;
  constructor() {
    this.express = express();
    this.db = this.initDB();
    this.run();
    this.loadRoutes();
    this.initMqqt();
  }

  private run() {
    this.express.listen(3000, () => {
      return console.log('Server is running in port: ', 3000);
    });
  }

  private loadRoutes(): void {
    this.express.use('/', router);
  }

  private async initDB(): Promise<Connection> {
    const mongoDB = `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.kk4in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await connect(mongoDB);
    const db = connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error: '));
    return db;
  }

  private async initMqqt() {
    const host = `192.168.178.10`;
    const port = `1883`;
    const connectUrl = `mqtt://${host}:${port}`;
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const client = mqqt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    const topic = 'home/catbert/currentWeight';
    client.on('connect', () => {
      console.log('Connected with MQTT server');
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}`);
      });

      client.on('message', (topic, payload) => {
        console.log('Received message', topic, payload.toString());
      });
    });
  }
}

export default App;
