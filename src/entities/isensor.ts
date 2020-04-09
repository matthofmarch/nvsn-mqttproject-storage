import * as mongoose from 'mongoose'
import { IMeasurement, MeasurementSchema } from './imeasurement';

/*
References:
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose#static-methods
https://mongoosejs.com/docs/2.7.x/docs/virtuals.html
https://stackoverflow.com/questions/42448372/typescript-mongoose-static-model-method-property-does-not-exist-on-type
*/


export interface ISensor extends mongoose.Document {
    name: String;
    location: String;
    type: String;
    unit: String;
    measurements: Array<IMeasurement>; 

    //mongoose property
    readonly path: String;
};  

//enable public static method
export interface ISensorModel extends mongoose.Model<ISensor> {
    getValuesFromPath(path: String): {name: String, location: string};
}

//mongoose Schema
export const SensorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true },
    measurements: { type: [MeasurementSchema] }
},
{ 
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


//property
SensorSchema.virtual('path').get(function (this: ISensor) {
    return this.location + '/' + this.name;
});

//static method
SensorSchema.static('getValuesFromPath', function (path: String) {
    const str: String[] = path.split('/');
    //console.log("\n\n" + path + " " + str + " " + str.length);

    if(str[0] === "undefined" || str[0] === "")
        return {};
    else if(str[1] === "undefined" || str[1] === "")
        return {location: str[0]};
    else
        return {location: str[0], name: str[1]};
});
  
const Sensor = mongoose.model<ISensor, ISensorModel>('Sensor', SensorSchema);
export default Sensor;