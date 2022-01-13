import * as mqtt from 'mqtt';

class Mqtt {
  public server: string;
  public topics: Array<string>;
  public client: mqtt.MqttClient;

  constructor(server: string, topics: Array<string>) {
    this.server = server;
    this.topics = topics;
    this.initializeBroker();
  }

  public initializeBroker(): void {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    this.client = mqtt.connect(`mqtt://${this.server}`, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });
    this.client.on('connect', () => {
      console.log('Connected with MQTT server');
      this.topics.forEach((topic) => {
        this.subscribeToTopic(topic);
      });
    });
  }

  public sendComand(command: string): void {
    console.log(command);
  }

  public subscribeToTopic(topic: string): void {
    this.client.subscribe(topic, () => {
      console.log(`Subscribed to topic 'home/catbert/${topic}`);
    });

    this.client.on('message', (topic, payload) => {
      console.log('Received message from topic: ', topic, payload.toString());
    });
  }
}

export default Mqtt;
