import { Request, Response, Router } from 'express';

import Cat from './cat.interface';
import catModel from './cats.model';
import Mqtt from '../Mqtt';

class CatsController {
  public path = '/cats';
  public router = Router();
  private cat = catModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createEndPoint);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
    this.router.post(`${this.path}/registerRFID`, this.addRFID);
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

  private addRFID = (request: Request, response: Response) => {
    Mqtt.sendCommand('registerNewCat');

    let rfid = '';
    while (rfid !== '') {
      rfid = Mqtt.getNewRFID();
      console.log(rfid);
    }
    Mqtt.sendCommand('');
    response.send('registering new cat..');
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
