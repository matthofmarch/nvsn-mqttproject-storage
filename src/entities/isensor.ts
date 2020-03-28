import * as mongoose from 'mongoose'
import { IReading, ReadingSchema } from './ireading';

export interface ISensor extends mongoose.Document {
    readonly id: Number;
    name: String;
    type: String;
    unit: String;
    readings: Array<IReading>; 
};

export const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true },
    readings: { type: [ReadingSchema] }
});
  
const Sensor = mongoose.model<ISensor>('Sensor', SensorSchema);
export default Sensor;