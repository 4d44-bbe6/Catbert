import IEntity from '../entity/entity.interface';

interface IStock extends IEntity {
  name: string;
  value: number;
  cats: Array<string>;
}

export default IStock;
