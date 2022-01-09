import * as mqtt from 'mqtt';

class Mqtt {
  public server: string;
  public topics: Array<string>;

  constructor(server: string, topics: Array<string>) {
    this.server = server;
    this.topics = topics;
    this.initializeBroker();
  }

  public initializeBroker(): void {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const client = mqtt.connect(`mqtt://${this.server}`, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });
    client.on('connect', () => {
      console.log('Connected with MQTT server');
      this.topics.forEach((topic) => {
        client.subscribe(topic, () => {
          console.log(`Subscribed to topic 'home/catbert/${topic}`);
        });
      });

      client.on('message', (topics, payload) => {
        console.log(
          'Received message from topic: ',
          topics,
          payload.toString(),
        );
      });
    });
  }
}

export default Mqtt;
