import Sensor, { ISensor } from '../entities/isensor';
import { IMeasurement } from '../entities/imeasurement';
import { Mongoose, Connection } from 'mongoose';

/*
Repository that saves and manages sensor and measurement data
*/

const mongoose: Mongoose = require('mongoose')

class MongoRepository {
    private ip: string = "172.18.55.97";
    private db: Connection | undefined; 

    private static _instance: MongoRepository = new MongoRepository();
    
    public static get instance() : MongoRepository {
        return this._instance;
    }
    
    private constructor (){}

    public async connect(){
        await mongoose.connect(`mongodb://${this.ip}:27017/test`, {useNewUrlParser: true});
        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function() {
            console.log("MongoDB is connected!");
        });
    }

    public async disconnect(){
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

    public async addReadingToSensor(s: ISensor, r: IMeasurement){
        if(s === null || s === undefined || r === null || r === undefined)
            return;

        try {
            await s.collection.updateOne({name: "office"}, { $push: {measurements: {r}}})
        } catch (error) {
            console.log(error);
        }
    }

    public async getMeasurements(s: ISensor){
        if(s === null || s === undefined)
            return;

        try {
            return (await s.collection.findOne({name: "office"})).measurements;
        } catch (error) {
            console.log(error);
        }
    }

    public async findSensorByName(name: string) : Promise<ISensor | undefined>{
        if(name === null || name === undefined || name === "")
            return undefined;

        try {
            return await this.db?.collection("sensor").findOne({name: "office"}) as ISensor;
        } catch (error) {
            console.log(error);
        }
    }

    public async findInTimeSpan(start: Date, end: Date, sensor: ISensor){
        if(name === null || name === undefined || name === "")
            return null;

        try {
            /*const a = { 
                $elemMatch: { 
                    measurements: { 
                        time: { 
                            $gte: start, $lte: end 
                        }
                    }
                }
            }

            return await this.db?.collection("sensor").findOne({ name: sensor.name }, a);     */ 
        } catch (error) {
            console.log(error);
        }
    }

    public async getMaxMeasurement (s: ISensor){
        if(s === null || s === undefined)
            return;

        try {
            //return await this.db?.collection("sensor").aggregate({name});
        } catch (error) {
            console.log(error);
        }
    }
}

export default MongoRepository;