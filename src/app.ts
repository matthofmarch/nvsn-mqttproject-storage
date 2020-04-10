import express, { response } from 'express';
import { MQTTHandler } from './mqtthandler'
import bodyParser from 'body-parser'
import MongoRepository from './repository/repository';
import Sensor, { ISensor } from './entities/isensor';
import Reading, { MeasurementSchema, IMeasurement } from './entities/imeasurement';
import Measurement from './entities/imeasurement';

const app = express();
const port = 8020; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mqttClient: MQTTHandler = new MQTTHandler('mqtt://51.136.13.51', ['sensors/+/+']);
const repo: MongoRepository = MongoRepository.instance;

app.get( "/", ( req, res ) => {
    console.log('Express Home')
});

app.get("/sensors/:location?/:name?/max", async ( req, res ) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    res.send(await repo.getMaxMeasurement(sensorPath));
});

app.get("/sensors/:location?/:name?/min", async ( req, res ) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location + "/" + req.params.name;
    res.send(await repo.getMinMeasurement(sensorPath));
});

app.get("/sensors/:location?/:name?/all", async ( req, res ) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location + "/" + req.params.name;
    res.send(await repo.getMeasurements(sensorPath));
});

app.get( "/sensors/:location?/:name?/average", async ( req, res ) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    res.send(await repo.getAverageValue(sensorPath));
});

//with body
app.get('/sensors/:location?/:name?/between', async (req, res) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    var startTime: Date = new Date(req.query.startTime);
    var endTime: Date = new Date(req.query.endTime);

    res.send(await repo.findInTimeSpan(sensorPath, startTime, endTime));
});

app.get('/sensors/:location?/:name?/:count/between/', async (req, res) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    var startTime: Date = new Date(req.query.startTime);
    var endTime: Date = new Date(req.query.endTime);
    
    //console.log(req.params.count);
    //console.log(await repo.findInTimeSpanWithCount(sensorPath, startTime, endTime, parseInt(req.params.count)));

    res.send(await repo.findInTimeSpanWithCount(sensorPath, startTime, endTime, parseInt(req.params.count)));
});


app.listen(port, async () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);


    repo.connect();
});


