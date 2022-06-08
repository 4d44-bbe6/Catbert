import { Request, Response, Router } from 'express';
import stockModel from './stock.model';
import Stock from './stock.interface';

class StockController {
  private path = '/stock';
  private router = Router();
  private stock = stockModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.post(this.path, this.create);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  private remove = (request: Request, response: Response) => {
    const id = request.params.id;
    this.stock.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    });
  };

  private create = (request: Request, response: Response) => {
    const stockData: Stock = {
      lastUpdated: Date(),
      ...request.body,
    };

    const newStock = new this.stock({
      ...stockData,
    });

    newStock.save().then((savedStock) => {
      response.send(savedStock);
    });
  };

  private getAll = (request: Request, response: Response) => {
    this.stock.find().then((stock) => {
      response.send(stock);
    });
  };

  private update = (request: Request, response: Response) => {
    const id = request.params.id;
    this.stock.findById(id).then((stock) => {
      stock.save().then((updatedStock) => {
        response.send(updatedStock);
      });
    });
  };
}

export default StockController;
