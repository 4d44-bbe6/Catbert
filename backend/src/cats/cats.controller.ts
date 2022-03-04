import { Request, Response, Router } from 'express';

import Cat from './cat.interface';
import catModel from './cats.model';
import metricModel from '../metrics/metrics.model';
import Mqtt from '../Mqtt';

class CatsController {
  public path = '/cats';
  public router = Router();
  private cat = catModel;
  private metric = metricModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createEndPoint);
    this.router.post(`${this.path}/registerRFID`, this.addRFID);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  private createEndPoint = async (request: Request, response: Response) => {
    const cat = await this.create(request.body);
    response.send(cat);
  };

  private getAll = (request: Request, response: Response) => {
    this.cat.find().then((cats) => {
      response.send(cats);
    });
  };

  private getById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.cat.findById(id).then((cat) => {
      response.send(cat);
    });
  };

  private update = (request: Request, response: Response) => {
    const id = request.params.id;
    const { name } = request.body;

    this.cat.findById(id).then((cat) => {
      if (name) cat.name = name;
      cat.save().then((updatedCat) => {
        response.send(updatedCat);
      });
    });
  };

  private remove = async (request: Request, response: Response) => {
    const id = request.params.id;

    this.cat.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };

  private addRFID = async (request: Request, response: Response) => {
    Mqtt.sendCommand('registerNewCat');

    const { value } = await this.metric
      .findOne({ topic: 'home/catbert/scales/Scale001/currentRFID' })
      .sort({ timestamp: -1 });
    const { name } = request.body;

    const newCat = await this.create({
      name,
      rfid: value,
    });

    console.log('new Cat', newCat);
    response.send(newCat);
  };

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
