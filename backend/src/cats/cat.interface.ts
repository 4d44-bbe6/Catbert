import IEntity from '../entity/entity.interface';
interface ICat extends IEntity {
  rfid: string;
  scales: Array<string>;
  color: string;
  amountEaten: number;
}

export default ICat;
