import { Request, Response, Router } from 'express';

import Scale from './scale.interface';
import scaleModel from './scales.model';

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
      if (location) scale.location = location;
      scale.save().then((updatedScale) => {
        response.send(updatedScale);
      });
    });
  };

  removeScale = async (request: Request, response: Response) => {
    const id = request.params.id;

    this.scale.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };

  create = (request: Request, response: Response) => {
    const scale: Scale = {
      lastUpdated: Date(),
      ...request.body,
    };

    const createdScale = new scaleModel(scale);
    createdScale.save().then((savedScale) => {
      response.send(savedScale);
    });
  };
}

export default ScalesController;
