import * as mqtt from 'mqtt';
import metricModel from './metrics/metrics.model';

const watchedTopics = [
  'home/catbert/scales/Scale001/currentWeight',
  'home/catbert/scales/Scale001/currentRFID',
];

class Mqtt {
  private static server: string;
  public topics: Array<string>;

  constructor(server: string, topics: Array<string>) {
    Mqtt.server = server;
    this.topics = topics;
    this.initializeBrokerConnection();
  }

  private initializeBrokerConnection() {
    const client = mqtt.connect(`mqtt://${Mqtt.server}`);

    client.on('connect', function () {
      watchedTopics.forEach((topic) => {
        client.subscribe(topic, function (err) {
          if (!err) {
            console.log(`Subscribed to: ${topic}`);
          }
        });
      });
    });

    client.on('message', function (topic, message) {
      if (topic === watchedTopics[0]) {
        const value = message.toString().replace(/ /g, '');

        const metric = {
          topic: topic,
          value: value,
          timestamp: Date(),
          scale: '61f2979c9ccf0a042c7667bf',
        };
        const createdMetric = new metricModel(metric);
        createdMetric.save().then((temp) => console.log(temp));
      }
    });
  }

  static sendCommand(command: string): void {
    const client = mqtt.connect(`mqtt://${Mqtt.server}`);
    client.publish('home/catbert/scales/Scale001/command', command);
  }
}

export default Mqtt;
