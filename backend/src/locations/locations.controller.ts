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
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  getAll = (request: Request, response: Response) => {
    this.location.find().then((locations) => {
      response.send(locations);
    });
  };

  getById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.location.findById(id).then((location) => {
      response.send(location);
    });
  };

  update = (request: Request, response: Response) => {
    const id = request.params.id;
    const { name, scales } = request.body;

    this.location.findById(id).then((location) => {
      if (name) location.name = name;
      if (scales) location.scales = scales;

      location.save().then((updatedLocation) => {
        response.send(updatedLocation);
      });
    });
  };

  remove = async (request: Request, response: Response) => {
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

    const createdLocation = new this.location({
      ...location,
    });
    createdLocation.save();
    response.send(createdLocation);
  };
}

export default LocationsController;
