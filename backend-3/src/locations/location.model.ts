import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export interface Location extends mongoose.Document {
  id: string;
  name: string;
  description: string;
}
