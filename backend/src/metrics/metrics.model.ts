import { model, Schema, Document } from 'mongoose';
import IMetric from './metric.interface';

const metricSchema = new Schema({
  type: String,
  value: Schema.Types.Mixed,
  timestamp: Date,
});

const metricModel = model<IMetric & Document>('Metric', metricSchema);

export default metricModel;
