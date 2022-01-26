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
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
    this.router.post(`${this.path}/:addrfid`, this.addRFID);
  }

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

  remove = async (request: Request, response: Response) => {
    const id = request.params.id;

    this.cat.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };

  addRFID = (request: Request, response: Response) => {};

  create = (request: Request, response: Response) => {
    const cat: Cat = {
      lastUpdated: Date(),
      ...request.body,
    };

    const createdCat = new catModel(cat);
    createdCat.save().then((savedCat) => {
      response.send(savedCat);
    });
  };
}

export default CatsController;
