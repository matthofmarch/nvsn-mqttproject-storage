import express from 'express';
import { MQTTHandler } from './mqtthandler'
import bodyParser from 'body-parser'
import MongoRepository from './repository/repository';
import Sensor from './entities/isensor';
import Reading, { MeasurementSchema, IMeasurement } from './entities/ireading';

const app = express();
const port = 3000; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mqttClient: MQTTHandler = new MQTTHandler('mqtt://52.157.91.193', ['#']);

app.get( "/", ( req, res ) => {
    console.log('Express Home')
});

app.get( "/between", ( req, res ) => {
    
});

app.get( "/max", ( req, res ) => {
    console.log('Express Home')
});

app.get( "/min", ( req, res ) => {
    console.log('Express Home')
});

app.get( "/average", ( req, res ) => {
    console.log('Express Home')
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});



/*
function crudTest (){
    repo.connect();

    const s = new Sensor({name: "tree", type: "co2", unit:"%"});
    const r = new Reading({value: 50, time: new Date(2020, 2, 3, 14, 34, 2)})
    //repo.addSensor(s);
    repo.addReadingToSensor(s, r);
    repo.getReadings(s).then(x => x.map(y => console.log(y)));
}

crudTest();
*/