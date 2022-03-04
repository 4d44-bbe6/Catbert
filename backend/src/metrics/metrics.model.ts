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

const metricModel = model<IMetric & Document>('Metric', metricSchema);

export default metricModel;
