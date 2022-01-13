import IEntity from '../entity/entity.interface';
interface IScale extends IEntity {
  address: string;
  description: string;
  cats: Array<string>;
}

export default IScale;
