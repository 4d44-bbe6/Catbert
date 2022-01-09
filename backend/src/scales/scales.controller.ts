import { Request, Response, Router } from 'express';

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
    this.router.get(`${this.path}/:id`, this.getScaleById);
    this.router.patch(`${this.path}/:id`, this.updateScale);
    this.router.delete(`${this.path}/:id`, this.removeScale);
  }

  getAll = (request: Request, response: Response) => {
    this.scale.find().then((scales) => {
      response.send(scales);
    });
  };

  getScaleById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.scale.findById(id).then((scale) => {
      response.send(scale);
    });
  };

  updateScale = (request: Request, response: Response) => {
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

  removeScale = (request: Request, response: Response) => {
    const { id } = request.params;

    this.scale.findById(id).then((scale) => {
      console.log('found scale:', scale);
      return scale.remove((err) => {
        if (!err) {
          locationModel.findByIdAndUpdate(scale.location, {
            _id: {
              $in: scale.location,
            },
          });
        }
      });
    });

    this.scale.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
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
