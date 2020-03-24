import * as mongoose from 'mongoose'

export interface IReading extends mongoose.Document {
    value: Number
    time: Date
};

export const ReadingSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    time: {type: Date, required: true}
});