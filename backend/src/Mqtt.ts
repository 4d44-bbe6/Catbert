import * as mqtt from 'mqtt';
import metricModel from './metrics/metrics.model';
import { SCALE_TOPIC } from './config';

const watchedTopics = [
  `${SCALE_TOPIC}/currentWeight`,
  `${SCALE_TOPIC}/currentRFID`,
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
    let createdMetric;
    let newMetric;
    const metric = metricModel;

    client.on('connect', function () {
      watchedTopics.forEach((topic) => {
        client.subscribe(topic, function (err) {
          if (!err) {
            console.log(`Subscribed to: ${topic}`);
          }
        });
      });
    });

    client.on('message', async function (topic, message) {
      let foundRFID;
      // Gewicht
      if (topic === watchedTopics[0]) {
        await metric
          .findOne({ topic: 'home/catbert/scales/Scale001/currentRFID' })
          .sort({ timestamp: -1 })
          .then((rfid) => (foundRFID = rfid));
        newMetric = {
          topic: topic,
          value: message.toString().replace(/ /g, ''),
          rfid: foundRFID.value,
          timestamp: Date(),
          scale: '61f2979c9ccf0a042c7667bf',
        };
      }

      // RFID
      if (topic === watchedTopics[1]) {
        console.log('rfid');
        newMetric = {
          topic: topic,
          value: message.toString(),
          timestamp: Date(),
          scale: '61f2979c9ccf0a042c7667bf',
        };
      }

      createdMetric = new metricModel(newMetric);
      createdMetric.save().then((res) => console.log(res));
    });
  }

  static sendCommand(command: string): void {
    console.log('command to mqtt', command);
    const client = mqtt.connect(`mqtt://${Mqtt.server}`);
    client.publish(`${SCALE_TOPIC}/command`, command);
  }
}

export default Mqtt;
