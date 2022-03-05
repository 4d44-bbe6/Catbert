import { model, Schema, Document } from 'mongoose';
import IMetric from './metric.interface';

const metricSchema = new Schema({
  topic: String,
  value: Schema.Types.Mixed,
  rfid: String,
  scale: {
    ref: 'Scale',
    type: Schema.Types.ObjectId,
  },
  timestamp: Date,
});

metricSchema.virtual('cat', {
  ref: 'Cat',
  localField: 'rfid',
  foreignField: 'rfid',
  justOne: true,
});

metricSchema.set('toObject', { virtuals: true });
metricSchema.set('toJSON', { virtuals: true });

const metricModel = model<IMetric & Document>('Metric', metricSchema);

export default metricModel;
