import { model, Schema, Document } from 'mongoose';
import IScale from './scale.interface';

const scaleSchema = new Schema({
  name: String,
  description: String,
  location: String,
  lastUpdated: Date,
});

const scaleModel = model<IScale & Document>('Scale', scaleSchema);
export default scaleModel;
