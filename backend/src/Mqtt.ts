import * as mqtt from 'mqtt';
import metricModel from './metrics/metrics.model';
import { SCALE_TOPIC } from './config';
import stockModel from './stock/stock.model';
import catModel from './cats/cats.model';

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
    const stock = stockModel;
    const cat = catModel;

    /**
     * Monitors both supplied topics for new messages. Based on the the topic two different paths are followed:
     */
    client.on('connect', function () {
      watchedTopics.forEach((topic) => {
        client.subscribe(topic, function (err) {
          if (!err) {
            console.log(`Subscribed to: ${topic}`);
          }
        });
      });
    });

    /**
     *
     * 1. Weight:
     * When there is a weight change being detected, we first need to retrieve the previous weight in order to measure the weight difference.
     * This weight difference is added to the `AmountEaten' value of a cat, which we find by finding the cat with the RFID-value every weight change supplies.
     * The weight difference is subtracted from the available stock.
     * The new weight is saved as a new metric and sent to MongoDB.
     *
     * 2. RFID:
     * New RFID-entries are given the current date as a timestamp and are sent to MongoDB.
     *
     */
    client.on('message', async function (topic, message) {
      // Gewicht
      if (topic === watchedTopics[0] && message) {
        let foundRFID;
        let previousWeight = 0.0;

        previousWeight = await metric
          .findOne({ topic: 'home/catbert/scales/Scale001/currentWeight' })
          .sort({ timestamp: -1 })
          .then((weight) => (previousWeight = parseFloat(weight.value)))
          .catch(() => (previousWeight = 0.0));

        await metric
          .findOne({ topic: 'home/catbert/scales/Scale001/currentRFID' })
          .sort({ timestamp: -1 })
          .then((rfid) => (foundRFID = rfid.value))
          .catch(() => (foundRFID = '3de9357293'));

        newMetric = {
          topic: topic,
          value: message.toString().replace(/ /g, ''),
          rfid: foundRFID,
          timestamp: Date(),
          scale: '61f2979c9ccf0a042c7667bf',
        };

        const differenceWeight = previousWeight - parseFloat(newMetric.value);
        const currentStock = await stock.findOne();

        await stock.findOneAndUpdate(
          {},
          {
            value: (currentStock.value - differenceWeight).toFixed(0),
          },
        );

        const currentCat = await cat.findOne({
          rfid: foundRFID,
        });

        await cat.findOneAndUpdate(
          { rfid: foundRFID },
          {
            lastUpdated: Date(),
            amountEaten: currentCat.amountEaten + Math.abs(differenceWeight),
          },
        );
      }

      // RFID
      if (topic === watchedTopics[1]) {
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

  /**
   *
   * Incoming commands are sent to the MQTT server in the specified topic.
   *
   * @param command
   */
  static sendCommand(command: string): void {
    const client = mqtt.connect(`mqtt://${Mqtt.server}`);
    client.publish(`${SCALE_TOPIC}/command`, command);
  }
}

export default Mqtt;
