import { model, Schema, Document } from 'mongoose';
import ILocation from './location.interface';

const locationSchema = new Schema({
  name: String,
  lastUpdated: Date,
});

const locationModel = model<ILocation & Document>('Location', locationSchema);

export default locationModel;
