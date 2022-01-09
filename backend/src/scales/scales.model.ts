import { model, Schema, Document } from 'mongoose';
import IScale from './scale.interface';

const scaleSchema = new Schema({
  name: String,
  description: String,
  location: {
    ref: 'Location',
    type: Schema.Types.ObjectId,
  },
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
