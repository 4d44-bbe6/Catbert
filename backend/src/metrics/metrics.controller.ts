import { Request, Response, Router } from 'express';
import Metric from './metric.interface';
import metricModel from './metrics.model';
import catModel from '../cats/cats.model';
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
    this.router.get(`${this.path}/:id`, this.getByScaleId);
    this.router.get(`${this.path}/:range/:id`, this.getMetricsByRange);
  }

  private getAll = (request: Request, response: Response) => {
    this.metric.find().then((metrics) => {
      response.send(metrics);
    });
  };

  private getMetricsByRange = (request: Request, response: Response) => {
    let fromDate: Date;
    const { id, range } = request.params;

    console.log('getData', id, range);

    switch (range) {
      case 'lastDay': {
        const parsedMetrics = [];
        fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.metric
          .find({
            scale: id,
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
      case 'lastWeek': {
        const parsedMetrics = [];
        fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        console.log(fromDate);
        this.metric
          .find({
            scale: id,
            timestamp: {
              $gte: fromDate,
              $lte: Date.now(),
            },
          })
          .then((foundMetrics) => {
            let tmpCount = 0;
            const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
            days.forEach((day) => {
              let currentDay = true;
              const avgMetric = [];
              foundMetrics.forEach((foundMetric) => {
                const logDay = currentDay ? day : '';
                const metricDay = days[foundMetric['timestamp'].getDay()];
                if (metricDay === day) {
                  avgMetric.push({
                    timestamp: logDay,
                    value: parseInt(foundMetric['value']),
                  });
                  currentDay = false;
                }

                avgMetric.forEach(({ value }) => {
                  tmpCount += value;
                });
                if (avgMetric.length > 0) {
                  parsedMetrics.push({
                    timestamp: logDay,
                    value: tmpCount / avgMetric.length,
                  });
                }
                tmpCount = 0;
              });
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

  private getByScaleId = (request: Request, response: Response) => {
    console.log(Date());
    const id = request.params.id;
    this.metric
      .find({
        scale: id,
      })
      .then((foundMetrics) => {
        console.log(foundMetrics.length);
        response.send(foundMetrics);
      });
  };

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

  private create = (request: Request, response: Response) => {
    this.importMetric(request.body).then((savedMetric) => {
      response.send(savedMetric);
    });
  };
}

export default MetricsController;
