import { model, Schema, Document } from 'mongoose';
import ICat from './cat.interface';

const catSchema = new Schema({
  name: String,
  lastUpdated: Date,
});

const catModel = model<ICat & Document>('Cat', catSchema);
export default catModel;
