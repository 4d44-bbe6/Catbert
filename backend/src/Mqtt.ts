import * as mqtt from 'mqtt';
import metricModel from './metrics/metrics.model';
import Metric from './metrics/metric.interface';

const watchedTopics = [
  'home/catbert/scales/Scale001/currentWeight',
  'home/catbert/scales/Scale001/currentRFID',
];

class Mqtt {
  public server: string;
  public topics: Array<string>;

  constructor(server: string, topics: Array<string>) {
    console.log(topics);
    this.server = server;
    this.topics = topics;
    this.initializeBroker(this.server);
  }

  private initializeBroker(server: string): void {
    console.log(server);
    const client = mqtt.connect(`mqtt://${server}`);

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
      watchedTopics.forEach((watchedTopic) => {
        console.log(topic, watchedTopic);
        if (topic === watchedTopic) {
          const value = message.toString().replace(/ /g, '');
          console.log(topic, value);
          const metric = {
            topic: topic,
            value: value,
            timestamp: Date(),
          };
          const createdMetric = new metricModel(metric);
          console.log(createdMetric);
          createdMetric.save().then((temp) => console.log(temp));
        }
      });
    });
  }

  public sendComand(command: string): void {
    console.log(command);
  }
}

export default Mqtt;
