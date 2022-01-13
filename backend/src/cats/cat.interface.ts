import IEntity from '../entity/entity.interface';
interface ICat extends IEntity {
  rfid: string;
  scales: Array<string>;
}

export default ICat;
