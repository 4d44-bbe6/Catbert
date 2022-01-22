import IEntity from '../entity/entity.interface';

interface IStock extends IEntity {
  value: number;
  cats: Array<string>;
}

export default IStock;
