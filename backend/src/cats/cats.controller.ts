import { Request, Response, Router } from 'express';

import Cat from './cat.interface';
import catModel from './cats.model';
import metricModel from '../metrics/metrics.model';
import Mqtt from '../Mqtt';

import { RFID_TOPIC } from '../config';

/**
 * Provides CRUD endpoint for Cat
 */
class CatsController {
  public path = '/cats';
  public router = Router();
  private cat = catModel;
  private metric = metricModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createEndpoint);
    this.router.post(`${this.path}/registerRFID`, this.addRFIDEndpoint);
    this.router.get(this.path, this.getAllEndpoint);
    this.router.get(`${this.path}/:id`, this.getByIdEndpoint);
    this.router.patch(`${this.path}/:id`, this.updateEndpoint);
    this.router.delete(`${this.path}/:id`, this.removeEndpoint);
  }

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private createEndpoint = async (request: Request, response: Response) => {
    const cat = await this.create(request.body);
    response.send(cat);
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getAllEndpoint = (request: Request, response: Response) => {
    this.cat.find().then((cats) => {
      response.send(cats);
    });
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private getByIdEndpoint = (request: Request, response: Response) => {
    const id = request.params.id;
    this.cat.findById(id).then((cat) => {
      response.send(cat);
    });
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private updateEndpoint = (request: Request, response: Response) => {
    const id = request.params.id;
    const { name } = request.body;

    this.cat.findById(id).then((cat) => {
      if (name) cat.name = name;
      cat.save().then((updatedCat) => {
        response.send(updatedCat);
      });
    });
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private removeEndpoint = async (request: Request, response: Response) => {
    const id = request.params.id;

    this.cat.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };

  /**
   *
   * @param request HTTP Request
   * @param response HTTP Response
   */
  private addRFIDEndpoint = async (request: Request, response: Response) => {
    Mqtt.sendCommand('registerNewCat');

    const { value } = await this.metric
      .findOne({ topic: RFID_TOPIC })
      .sort({ timestamp: -1 });
    const { name } = request.body;

    const newCat = await this.create({
      name,
      rfid: value,
      amountEaten: 0,
    });

    response.send(newCat);
  };

  /**
   *
   * Creates a new cat and saves it in the MongoDB Database.
   *
   */
  private create = async (data) => {
    const cat: Cat = {
      lastUpdated: Date(),
      ...data,
    };

    const newCat = new catModel(cat);
    const savedCat = await newCat.save();

    return savedCat;
  };
}

export default CatsController;
