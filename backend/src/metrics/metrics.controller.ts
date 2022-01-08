import { Request, Response, Router } from 'express';

import Metric from './metric.interface';
import metricModel from './metrics.model';

class MetricsController {
  public path = '/scales';
  public router = Router();
  private metric = metricModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getMetricById);
  }

  getAll = (request: Request, response: Response) => {
    this.metric.find().then((scales) => {
      response.send(scales);
    });
  };

  getMetricById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.metric.findById(id).then((metric) => {
      response.send(metric);
    });
  };

  create = (request: Request, response: Response) => {
    const metric: Metric = {
      lastUpdated: Date(),
      ...request.body,
    };

    const createdMetric = new metricModel(metric);
    createdMetric.save().then((savedMetric) => {
      response.send(savedMetric);
    });
  };
}

export default MetricsController;
