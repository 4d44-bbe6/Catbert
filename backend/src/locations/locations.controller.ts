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
    this.router.get(this.path, this.getAll);
  }

  getAll = (request: Request, response: Response) => {
    this.location.find().then((locations) => {
      response.send(locations);
    });
  };
}

export default LocationsController;
