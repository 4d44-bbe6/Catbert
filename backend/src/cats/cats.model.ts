import { model, Schema, Document } from 'mongoose';
import ICat from './cat.interface';

const catSchema = new Schema({
  name: String,
  rfid: String,
  color: String,
  amountEaten: Number,
  scales: [
    {
      ref: 'Scale',
      type: Schema.Types.ObjectId,
    },
  ],
  lastUpdated: Date,
});

const catModel = model<ICat & Document>('Cat', catSchema);
export default catModel;
