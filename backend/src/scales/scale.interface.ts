import IEntity from '../entity/entity.interface';
interface IScale extends IEntity {
  description: string;
  location: string;
  cats: Array<string>;
}

export default IScale;
