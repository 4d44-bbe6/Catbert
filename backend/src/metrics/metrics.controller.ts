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
    this.router.get(`${this.path}/:id`, this.getById);
  }

  private getAll = (request: Request, response: Response) => {
    this.metric.find().then((scales) => {
      response.send(scales);
    });
  };

  private getById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.metric.findById(id).then((metric) => {
      response.send(metric);
    });
  };

  public importMetric = (body) => {
    const metric: Metric = {
      lastUpdated: Date(),
      ...body,
    };

    const createdMetric = new metricModel(metric);
    console.log(createdMetric);

    const temp = createdMetric.save().then((savedMetric) => {
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
