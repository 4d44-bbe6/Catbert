import { Request, Response, Router } from 'express';

import Location from './location.interface';
import locationModel from './locations.model';

class LocationsController {
  public path = '/locations';
  public router = Router();
  private location = locationModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getScaleById);
    this.router.patch(`${this.path}/:id`, this.updateScale);
    this.router.delete(`${this.path}/:id`, this.removeScale);
  }

  getAll = (request: Request, response: Response) => {
    this.location.find().then((locations) => {
      response.send(locations);
    });
  };

  getScaleById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.location.findById(id).then((location) => {
      response.send(location);
    });
  };

  updateScale = (request: Request, response: Response) => {
    const id = request.params.id;
    const { name } = request.body;

    this.location.findById(id).then((location) => {
      if (name) location.name = name;

      location.save().then((updatedLocation) => {
        response.send(updatedLocation);
      });
    });
  };

  removeScale = async (request: Request, response: Response) => {
    const id = request.params.id;

    this.location.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };

  create = (request: Request, response: Response) => {
    const location: Location = {
      lastUpdated: Date(),
      ...request.body,
    };

    const createdScale = new locationModel(location);
    createdScale.save().then((savedScale) => {
      response.send(savedScale);
    });
  };
}

export default LocationsController;
