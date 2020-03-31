import * as mongoose from 'mongoose'
import { IMeasurement, MeasurementSchema } from './imeasurement';

export interface ISensor extends mongoose.Document {
    readonly id: Number;
    name: String;
    location: String;
    type: String;
    unit: String;
    measurements: Array<IMeasurement>; 
};  

export const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true },
    measurements: { type: [MeasurementSchema] }
});
  
const Sensor = mongoose.model<ISensor>('Sensor', SensorSchema);
export default Sensor;