import { Request, Response, Router } from 'express';
import Scale from './scale.interface';
import scaleModel from './scales.model';
import catModel from '../cats/cats.model';

/**
 * Provides CRUD endpoints for the Scales.
 */
class ScalesController {
  public path = '/scales';
  public router = Router();
  private scale = scaleModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path, this.getAllByAPI);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  private getAllByAPI = (request: Request, response: Response) => {
    this.scale.find().then((scales) => {
      response.send(scales);
    });
  };

  private getById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.scale.findById(id).then((scale) => {
      response.send(scale);
    });
  };

  private update = (request: Request, response: Response) => {
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

  private remove = (request: Request, response: Response) => {
    const { id } = request.params;
    console.log('backend removing: ', id);

    this.scale.findByIdAndDelete(id).then((foundScale) => {
      foundScale.cats.forEach((cat) => {
        catModel.findById(cat).then((foundCat) => {
          foundCat.scales = foundCat.scales.filter(
            (item) => !foundCat._id.equals(item),
          );
          foundCat.save().then(() => {
            console.log('deleted');
            response.send('Deleted');
          });
        });
      });
    });
  };

  private create = (request: Request, response: Response) => {
    const { cats } = request.body;
    const scaleData: Scale = {
      lastUpdated: Date(),
      cats: cats,
      ...request.body,
    };

    const newScale = new this.scale({
      ...scaleData,
    });

    if (cats.length > 0) {
      cats.forEach((cat) => {
        catModel.findById(cat).then((cat) => {
          cat.scales = [...cat.scales, newScale._id];
          cat.save();
        });
      });
    }

    newScale.save().then((savedScale) => {
      savedScale.populate('cats').then((savedScale) => {
        response.send(savedScale);
      });
    });
  };
}

export default ScalesController;
