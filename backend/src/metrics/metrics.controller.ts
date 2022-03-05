import { Request, Response, Router } from 'express';
import Metric from './metric.interface';
import metricModel from './metrics.model';

import { WEIGHT_TOPIC, RFID_TOPIC } from '../config';
/**
 * Provides CRUD Endpoints for Metrics.
 */
class MetricsController {
  public path = '/metrics';
  public router = Router();
  private metric = metricModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/currentWeight`, this.getCurrentWeight);
    this.router.get(`${this.path}/latest`, this.getLatest);
    this.router.get(`${this.path}/:id`, this.getByScaleId);
    this.router.get(`${this.path}/:range/:id`, this.getMetricsByRange);
  }

  /**
   *
   * Returns the latest weight metric from MongoDB, therefore the current measured weight.
   * If there is no weight found, for example when first starting the bowl, 0 is returned in order to start a base point.
   *
   * @param request
   * @param response
   * @returns
   */
  private getCurrentWeight = async (request: Request, response: Response) => {
    const currentWeightData = await this.metric
      .findOne({ topic: WEIGHT_TOPIC })
      .sort({ timestamp: -1 });

    if (currentWeightData) {
      response.send(currentWeightData);
    } else {
      return 0;
    }
  };
  /**
   *
   * Get all weight metrics and populate the RFID value with the corresponding cat.
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getAll = (request: Request, response: Response) => {
    this.metric
      .find({
        topic: WEIGHT_TOPIC,
      })
      .populate('cat')
      .then((metrics) => {
        response.send(metrics);
      });
  };

  /**
   *
   * Retrieve the lastest saved RFID.
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getLatest = (request: Request, response: Response) => {
    this.metric
      .findOne({
        topic: RFID_TOPIC,
      })
      .sort({ timestamp: -1 })
      .then((foundMetric) => response.send(foundMetric));
  };

  /**
   *
   * Provides and endpoint for weight metrics in a specific range, ie 'Last Week' of 'Last 24 hours'.
   * Even though there are most likely a multitude of metrics saved, only one metric per hour (or day) is returned in order not to clutter any graphs.
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getMetricsByRange = (request: Request, response: Response) => {
    let fromDate: Date;
    const { id, range } = request.params;

    switch (range) {
      /**
       * Get all weight metrics starting from the current Date minus 24 hours until the current Date.
       * Looping through these 24 hours, all metrics are added to a temporary count and a average is calculated and returned.
       */
      case 'lastDay': {
        const parsedMetrics = [];
        fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.metric
          .find({
            scale: id,
            topic: WEIGHT_TOPIC,
            timestamp: {
              $gte: fromDate,
              $lte: Date.now(),
            },
          })
          .then((foundMetrics) => {
            for (let i = 0; i <= 23; i++) {
              let tmpCount = 0;
              const avgMetric = [];
              foundMetrics.forEach((foundMetric) => {
                const metricHour = foundMetric['timestamp'].getHours();

                if (metricHour === i) {
                  avgMetric.push({
                    hour: i,
                    value: parseInt(foundMetric['value']),
                  });
                }
              });
              avgMetric.forEach(({ value }) => {
                tmpCount += value;
              });
              if (avgMetric.length > 0) {
                parsedMetrics.push({
                  timestamp: i,
                  value: tmpCount / avgMetric.length,
                });
              }
            }

            response.send(parsedMetrics);
          });
        break;
      }
      /**
       * Get all weight metrics starting from the current Date minus 7 days until the current Date.
       * Looping through these 7 days, all metrics are added to a temporary count and a average is calculated and returned.
       */
      case 'lastWeek': {
        const parsedMetrics = [];
        fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        this.metric
          .find({
            scale: id,
            topic: WEIGHT_TOPIC,
            timestamp: {
              $gte: fromDate,
              $lte: Date.now(),
            },
          })
          .then((foundMetrics) => {
            const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
            days.forEach((day) => {
              let tmpCount = 0;

              const avgMetric = [];
              foundMetrics.forEach((foundMetric) => {
                const metricDay = days[foundMetric['timestamp'].getDay()];

                if (metricDay === day && foundMetric['value']) {
                  avgMetric.push({
                    timestamp: day,
                    value: parseInt(foundMetric['value']),
                  });
                }
              });
              avgMetric.forEach(({ value }) => {
                tmpCount += value;
              });

              if (avgMetric.length > 0) {
                parsedMetrics.push({
                  timestamp: day,
                  value: tmpCount / avgMetric.length,
                });
              }
            });
            response.send(parsedMetrics);
          });
        break;
      }
      default: {
        response.send([]);
        break;
      }
    }
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getByScaleId = (request: Request, response: Response) => {
    const id = request.params.id;
    this.metric
      .find({
        scale: id,
      })
      .then((foundMetrics) => {
        response.send(foundMetrics);
      });
  };

  /**
   *
   * @param body
   * @returns
   */
  public importMetric = (body) => {
    const metric: Metric = {
      lastUpdated: Date(),
      ...body,
    };

    const newMetric = new metricModel(metric);
    const temp = newMetric.save().then((savedMetric) => {
      return savedMetric;
    });
    return temp;
  };
  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */

  private create = (request: Request, response: Response) => {
    this.importMetric(request.body).then((savedMetric) => {
      response.send(savedMetric);
    });
  };
}

export default MetricsController;
