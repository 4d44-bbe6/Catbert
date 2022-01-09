import { model, Schema, Document } from 'mongoose';
import ILocation from './location.interface';

const locationSchema = new Schema({
  name: String,
  scales: [
    {
      ref: 'Scale',
      type: Schema.Types.ObjectId,
    },
  ],
  lastUpdated: Date,
});

const locationModel = model<ILocation & Document>('Location', locationSchema);

export default locationModel;
