import express from 'express';
import { MQTTHandler } from './mqtthandler'
import bodyParser from 'body-parser'

const app = express();
const port = 3000; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new MQTTHandler('mqtt://52.157.91.193', ['#']);

app.get( "/", ( req, res ) => {
    console.log('Express Home')
});

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});