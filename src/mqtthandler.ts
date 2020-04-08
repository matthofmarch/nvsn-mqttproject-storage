import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { IMessageDto } from './entities/imessagedto';
import MongoRepository from './repository/repository';
import Sensor, { ISensor } from './entities/isensor';
import Measurement from './entities/imeasurement';

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

            var sensor: ISensor | undefined = await this.repo.findSensorByName(mes.sensorname);
            if (sensor == undefined)
            {
                sensor = new Sensor({name: mes.sensorname, type: mes.type, unit: mes.unit, location: mes.location})
            }

            this.repo.addReadingToSensor(sensor, new Measurement({value: mes.value, time: Date.now}))
        });
    }

    parseMessage(topic: string, message: any): IMessageDto{
        const mes = message as IMessageDto;

        const topicPath: string[] = topic.split('/');
        mes.location = topicPath[0];
        mes.sensorname = topicPath[1];

        return mes;
    }
}

export { MQTTHandler }