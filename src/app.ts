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

const mqttClient: MQTTHandler = new MQTTHandler('mqtt://52.157.91.193', ['#']);
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
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    
    res.send(await repo.findInTimeSpan(sensorPath, startTime, endTime));
});

//with queryy
app.post('/sensors/:location?/:name?/between', async (req, res) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    
    res.send(await repo.findInTimeSpan(sensorPath, startTime, endTime));
});

app.get('/sensors/:location?/:name?/between/:count', async (req, res) => {
    if(req.params.location === undefined && req.params.name !== undefined)
        return;

    const sensorPath: String = req.params.location +"/" + req.params.name;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    
    res.send(await repo.findInTimeSpanWithCount(sensorPath, startTime, endTime, parseInt(req.params.count)));
});


app.listen(port, async () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);


    repo.connect();
});


