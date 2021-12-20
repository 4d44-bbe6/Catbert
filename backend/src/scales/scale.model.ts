import * as mongoose from 'mongoose';

export const ScaleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
});

export interface Scale extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  location: string;
}
