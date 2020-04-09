import Sensor, { ISensor } from '../entities/isensor';
import Measurement, { IMeasurement } from '../entities/imeasurement';
import { Mongoose, Connection } from 'mongoose';

/*
Repository that manages sensor and measurement data through a MongoDB connection
*/

const mongoose: Mongoose = require('mongoose')

class MongoRepository {
    private ip: string = "localhost";
    private port: string = "11021";
    private dbName: string = "smartfarm";
    private collectionName: string = "sensors";
    private db: Connection | undefined; 

    private static _instance: MongoRepository = new MongoRepository();
    
    public static get instance() : MongoRepository {
        return this._instance;
    }
    
    private constructor (){}

    public connect(){
        console.log("Connecting to MongoDB...")

        mongoose.set('useCreateIndex', true)
        mongoose.connect(`mongodb://${this.ip}:${this.port}/${this.dbName}`, {useNewUrlParser: true});
        
        this.db = mongoose.connection;

        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function() {
            console.log("MongoDB is connected!");
        });
    }

    public static async instanceAndConnect (){
        this._instance.connect();
        return this.instance;
    }

    public async disconnect(){
        console.log("Disconnecting from MongoDB")
        mongoose.connection.close();
    }

    public async addSensor(s: ISensor){
        if(s === null || s === undefined)
            return;

        console.log("Adding Sensor: " + s.path);

        try {
            await s.save();
            return;
        } catch (error) {
            console.log(error);
        }
    }


    public async addReadingToSensor(s: ISensor, meas: IMeasurement){
        if(s === null || s === undefined || meas === null || meas === undefined)
            return;

        try {
            await Sensor.updateOne({name: s.name}, { $push: {measurements: meas}})
            return;
        } catch (error) {
            console.log(error);
        }
    }

    public async addReadingToSensorByName(sensorPath: String, meas: IMeasurement){
        if(name === null || name === undefined || meas === null || meas === undefined)
            return;

        try {
            return await Sensor.updateOne( Sensor.getValuesFromPath(sensorPath), { $push: {measurements: meas}});
        } catch (error) {
            console.log(error);
        }
    }

    public async getMeasurements(sensorPath: String){
        if(sensorPath === null || sensorPath === undefined)
            return;

        try {
            const ag = Sensor.aggregate([
                { $match:  Sensor.getValuesFromPath(sensorPath) },
                { $unwind: "$measurements"},
                { $replaceRoot: { newRoot: "$measurements" } },
                { $project: { _id: 0}},
            ]).exec();

            return ag as IMeasurement[];
        } catch (error) {
            console.log(error);
        }
    }

    public async findSensorByName(sensorPath: string) : Promise<ISensor | undefined>{
        if(sensorPath === null || sensorPath === undefined)
            return undefined;

        try {
            return await Sensor.findOne(Sensor.getValuesFromPath(sensorPath)) as ISensor;
        } catch (error) {
            console.log(error);
        }
    }

    public async findInTimeSpan(sensorPath: String, start: Date, end: Date){
        if(sensorPath === null || sensorPath === undefined)
            return null;


        try {
            const values = Sensor.aggregate([
                { $match: Sensor.getValuesFromPath(sensorPath) },
                { $unwind: "$measurements"},
                { $match: { "measurements.time": { $gte: start,  $lte: end} }},
                { $replaceRoot: { newRoot: "$measurements" } },
                { $project: { _id: 0}},
                { $sort: {time: 1}}
            ]).exec();

            return values as IMeasurement[];
        } catch (error) {
            console.log(error);
        }
    }

    public async getCountOfMeasurements(sensorPath: String){
        if(sensorPath === null || sensorPath === undefined)
            return 0;

        try {
            const count = await Sensor.aggregate([
                { $match: Sensor.getValuesFromPath(sensorPath) },
                { $unwind: "$measurements"},
                { $group: { _id: null, count: { $sum: 1 } } },
                { $project: { _id: 0 } }
            ]).exec();

            return count;
        } catch (error) {
            console.log(error);
        }
    }

    public async findInTimeSpanWithCount(sensorPath: String, start: Date, end: Date, count: number){
        if(sensorPath === null || sensorPath === undefined)
            return null;

        try {
            const values = await Sensor.aggregate([
                { $match: Sensor.getValuesFromPath(sensorPath) },
                { $unwind: "$measurements"},
                { $match: { "measurements.time": { $gte: start,  $lte: end} }},
                { $replaceRoot: { newRoot: "$measurements" } },
                { $project: { _id: 0}},
                { $sort: {time: 1}}
            ]).exec() as IMeasurement[];

            var measCount: Number;

            //fetches the count of measurements and extracts it out of the object
            if((measCount = (await this.getCountOfMeasurements(sensorPath))[0].count) === undefined)
                return null;

            console.log(values);
            const interval: number = Math.floor(measCount as number / count);
            console.log("Interval: " +interval);

            const filteredValues = values.filter((m, i) => !(i % interval));
            console.log(filteredValues);
            console.log("FilteredValueLength: " + filteredValues.length);
            
            return filteredValues as IMeasurement[];
        } catch (error) {
            console.log(error);
        }
    }

    public async getMaxMeasurement (sensorPath: String){
        if(sensorPath === null || sensorPath === undefined)
            return null;

        try {
            const max = Sensor.aggregate([
                {$match: Sensor.getValuesFromPath(sensorPath) },
                {$unwind: "$measurements"},
                {$project: { measurements: 1, _id: 0}},
                {$replaceRoot: { newRoot: "$measurements" } },
                {$sort: {value: -1, time: -1}},
                {$limit: 1},
                {$project: {_id: 0}}
            ]).exec();
               
            return max as IMeasurement;
        } catch (error) {
            console.log(error);
        }
    }

    public async getMinMeasurement (sensorPath: String){
        if(sensorPath === null || sensorPath === undefined)
            return null;

        try {
            const min = Sensor.aggregate([
                {$match: Sensor.getValuesFromPath(sensorPath) },
                {$unwind: "$measurements"},
                {$project: { measurements: 1, _id: 0}},
                {$replaceRoot: { newRoot: "$measurements" } },
                {$sort: {value: 1, time: -1}},
                {$limit: 1},
                {$project: {_id: 0}}
            ]).exec();
               
            return min as IMeasurement;
        } catch (error) {
            console.log(error);
        }
    }

    public async getAverageValue (sensorPath: String){
        if(sensorPath === null || sensorPath === undefined)
            return null;

        try {
            const avg = Sensor.aggregate([
                {$match: Sensor.getValuesFromPath(sensorPath) },
                {$unwind: "$measurements"},
                {$group: {
                    _id: "$type",
                    avgValue: {$avg: "$measurements.value"} 
                  }
                },
                {$project: {val: {$trunc: ["$avgValue", 2]}, _id: 0}}
            ]).exec();
               
            return avg as Number;
        } catch (error) {
            console.log(error);
        }
    }

}

export default MongoRepository;