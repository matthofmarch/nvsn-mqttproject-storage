//import * as mongoose from 'mongoose'
const mongoose = require('mongoose')
import Sensor, { ISensor } from '../entities/isensor';
import { IReading } from '../entities/ireading';

class MongoRepository {

    private ip: string = "172.18.55.97";
    private db: any; 

    public async connect(){
        await mongoose.connect(`mongodb://${this.ip}:27017/test`, {useNewUrlParser: true});
        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function() {
            console.log("MongoDB is connected!");
        });
    }

    public async close(){
        mongoose.connection.close();
    }

    public async addSensor(s: ISensor){
        if(s === null || s === undefined)
            return;

        try {
            await s.save();
        } catch (error) {
            console.log(error);
        }
    }

    public async addReadingToSensor(s: ISensor, r: IReading){
        if(s === null || s === undefined)
            return;

        try {
            await s.collection.updateOne({name: "office"}, { $push: {readings: {r}}})
        } catch (error) {
            console.log(error);
        }
    }

    public async getReadings(s: ISensor){
        if(s === null || s === undefined)
            return;

        try {
            return (await s.collection.findOne({name: "office"})).readings;
        } catch (error) {
            console.log(error);
        }
    }
}

export default MongoRepository;