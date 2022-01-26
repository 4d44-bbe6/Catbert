import { Request, Response, Router } from 'express';
import stockModel from './stock.model';

class StockController {
  public path = '/stock';
  public router = Router();
  private stock = stockModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAll);
  }

  private getAll = (request: Request, response: Response) => {
    this.stock.find().then((stock) => {
      response.send(stock);
    });
  };
}

export default StockController;
