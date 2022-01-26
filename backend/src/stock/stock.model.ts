import { model, Schema, Document } from 'mongoose';
import IStock from './stock.interface';

const stockSchema = new Schema({
  name: String,
  value: Number,
  cats: [
    {
      ref: 'Cat',
      type: Schema.Types.ObjectId,
    },
  ],
  lastUpdated: Date,
});

const stockModel = model<IStock & Document>('Stock', stockSchema);
export default stockModel;
