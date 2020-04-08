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

app.get("/sensors/:location?/:name?/average", ( req, res ) => {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    res.send(repo.getMaxMeasurement(sensorPath));
});

app.get("/sensors/:location?/:name?/average", ( req, res ) => {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    res.send(repo.getMinMeasurement(sensorPath));
});

app.get( "/sensors/:location?/:name?/average", ( req, res ) => {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    res.send(repo.getAverageValue(sensorPath));
});

app.get( "/sensors/:location?/:name?/average", ( req, res ) => {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    res.send(repo.getAverageValue(sensorPath));
});

//with body
app.get('/sensors/:location?/:name?/between', function(req, res) {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    
    res.send(repo.findInTimeSpan(sensorPath, startTime, endTime));
});

//with queryy
app.post('/sensors/:location?/:name?/between', function(req, res) {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    
    res.send(repo.findInTimeSpan(sensorPath, startTime, endTime));
});

app.get('/sensors/:location?/:name?/between/:count', function(req, res) {
    if(location === undefined && name !== undefined)
        return;

    const sensorPath: String = req.params.location + req.params.name;
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    
    res.send(repo.findInTimeSpanWithCount(sensorPath, startTime, endTime, parseInt(req.params.count)));
});


app.listen(port, async () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);

    var s: ISensor = new Sensor({name: "plant", unit:"C", type:"temp", location:"aquarium"});
    var m1: IMeasurement = new Measurement({time: Date.parse("05.12.2020"), value: 100})
    var m2: IMeasurement = new Measurement({time: Date.parse("05.12.2014"), value: 80})

    repo.connect();

    //repo.addSensor(s);
    //repo.addReadingToSensorByName("plant", m1);
    //repo.addReadingToSensorByName("plant", m2);

    const he = await repo.findInTimeSpan("", new Date('2015-10-19'), new Date('2020-10-19'));

    repo.disconnect();
    console.log(he);
});


