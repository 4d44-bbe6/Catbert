import { model, Schema, Document } from 'mongoose';
import Location from './location.interface';

const locationSchema = new Schema({
  name: String,
  lastUpdated: Date,
});

const locationModel = model<Location & Document>('Location', locationSchema);

export default locationModel;
