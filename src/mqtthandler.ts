import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { IMessageDto } from './entities/imessagedto';
import MongoRepository from './repository/repository';
import Sensor, { ISensor } from './entities/isensor';
import Measurement from './entities/imeasurement';
import { json } from 'body-parser';

/*
Handles all incoming messages (Measurements) and automatically saves
them in the repository
*/

class MQTTHandler {
    client: MqttClient;
    repo: MongoRepository = MongoRepository.instance;

    constructor(url: string, topics: string[]) { 
        this.client = mqtt.connect(url);
        
        topics.forEach(element => {
            this.client.subscribe(element)
        });

        this.client.on('message', async (topic: string, message: any) => {
            const mes = this.parseMessage(topic, message);

            var sensor: ISensor | undefined = await this.repo.findSensorByPath(mes.location + "/" + mes.sensorname);
            if (sensor === undefined || sensor === null)
            {
                sensor = new Sensor({name: mes.sensorname, unit: mes.unit, type: mes.type, location: mes.location});
                this.repo.addSensor(sensor);
            }

            console.log("Adding" + sensor);
            this.repo.addMeasurementToSensor(sensor, new Measurement({value: mes.value, time: Date.now()}));
        });
    }

    parseMessage(topic: string, message: any): IMessageDto{
        const mes = JSON.parse(message) as IMessageDto;
        console.log(mes);

        const topicPath: string[] = topic.split('/');
        mes.location = topicPath[1];
        mes.sensorname = topicPath[2];

        return mes;
    }
}

export { MQTTHandler }