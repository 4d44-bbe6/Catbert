import { Request, Response, Router } from 'express';
import * as mongoose from 'mongoose';
import Scale from './scale.interface';
import scaleModel from './scales.model';
import locationModel from '../locations/locations.model';

class ScalesController {
  public path = '/scales';
  public router = Router();
  private scale = scaleModel;

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
    this.scale.find().then((scales) => {
      response.send(scales);
    });
  };

  getById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.scale.findById(id).then((scale) => {
      response.send(scale);
    });
  };

  update = (request: Request, response: Response) => {
    const id = request.params.id;
    const { name, description, location } = request.body;

    this.scale.findById(id).then((scale) => {
      if (name) scale.name = name;
      if (description) scale.description = description;

      if (location) {
        scale.location = location;
        locationModel.findById(location).then((location) => {
          location.scales = [...location.scales, scale._id];
          location.save();
        });
      }

      scale.save().then((updatedScale) => {
        response.send(updatedScale);
      });
    });
  };

  remove = async (request: Request, response: Response) => {
    const { id } = request.params;

    const foundScale = await this.scale.findByIdAndDelete(id);
    locationModel.findById(foundScale.location).then((foundLocation) => {
      foundLocation.scales = foundLocation.scales.filter(
        (item) => !foundScale._id.equals(item),
      );
      foundLocation.save().then((location) => {
        response.send(location);
      });
    });

    // const filterLocation = [];
    // foundLocation.scales.forEach((scale) => {
    //   if (foundScale._id.equals(scale)) {
    //     console.log(foundScale._id, 'verwijderen');
    //   } else {
    //     filterLocation.push(scale);
    //   }
    // });

    // console.log(filterLocation);
  };

  create = (request: Request, response: Response) => {
    const scaleData: Scale = {
      lastUpdated: Date(),
      location: request.body.location,
      ...request.body,
    };
    const createdScale = new this.scale({
      ...scaleData,
    });

    locationModel.findById(request.body.location).then((location) => {
      location.scales = [...location.scales, createdScale._id];
      location.save();
    });

    createdScale.save().then((savedScale) => {
      savedScale.populate('location').then((savedScale) => {
        response.send(savedScale);
      });
    });
  };
}

export default ScalesController;
