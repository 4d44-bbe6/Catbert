import * as mqtt from 'mqtt';
import { MQTT_SERVER } from './config';

class Mqtt {
  constructor() {
    this.initializeBroker();
  }

  public initializeBroker(): void {
    const client = mqtt.connect(`mqtt://${MQTT_SERVER}`);
    client.on('connect', () => {
      client.subscribe(['home/Catbert/currentWeight'], null, (res) => {
        console.log(res);
      });
    });
  }
}

export default Mqtt;
