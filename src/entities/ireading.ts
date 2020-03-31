import * as mongoose from 'mongoose'

export interface IMeasurement extends mongoose.Document {
    value: Number
    time: Date
};

export const MeasurementSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    time: {type: Date, required: true}
});

const Measurement = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
export default Measurement;