import { Request, Response, Router } from 'express';
import Scale from './scale.interface';
import scaleModel from './scales.model';
import catModel from '../cats/cats.model';

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
    const { name, description, cats } = request.body;

    this.scale.findById(id).then((scale) => {
      if (name) scale.name = name;
      if (description) scale.description = description;

      if (cats) {
        scale.cats = cats; // array met katten
        scale.cats.forEach((cat) => {
          catModel.findById(cat).then((cat) => {
            cat.scales = [...cat.scales, scale._id];
            cat.save();
          });
        });
      }

      scale.save().then((updatedScale) => {
        response.send(updatedScale);
      });
    });
  };

  remove = (request: Request, response: Response) => {
    const { id } = request.params;

    this.scale.findByIdAndDelete(id).then((foundScale) => {
      foundScale.cats.forEach((cat) => {
        catModel.findById(cat).then((foundCat) => {
          foundCat.scales = foundCat.scales.filter(
            (item) => !foundCat._id.equals(item),
          );
          foundCat.save();
        });
      });
    });
  };

  create = (request: Request, response: Response) => {
    const { cats } = request.body;
    const scaleData: Scale = {
      lastUpdated: Date(),
      cats: cats,
      ...request.body,
    };

    const createdScale = new this.scale({
      ...scaleData,
    });

    if (cats.length > 0) {
      cats.forEach((cat) => {
        catModel.findById(cat).then((cat) => {
          cat.scales = [...cat.scales, createdScale._id];
          cat.save();
        });
      });
    }

    createdScale.save().then((savedScale) => {
      savedScale.populate('cats').then((savedScale) => {
        response.send(savedScale);
      });
    });
  };
}

export default ScalesController;
