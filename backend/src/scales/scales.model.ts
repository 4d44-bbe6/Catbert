import { model, Schema, Document } from 'mongoose';
import IScale from './scale.interface';

const scaleSchema = new Schema({
  name: String,
  address: String,
  description: String,
  cats: [
    {
      ref: 'Cat',
      type: Schema.Types.ObjectId,
    },
  ],
  lastUpdated: Date,
});

const scaleModel = model<IScale & Document>('Scale', scaleSchema);
export default scaleModel;
