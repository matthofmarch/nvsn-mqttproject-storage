import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';

class MQTTHandler {
    client: MqttClient;

    constructor(url: string, topics: string[]) { 
        this.client = mqtt.connect(url);
        
        topics.forEach(element => {
            this.client.subscribe(element)
        });

        this.client.on('message', (topic: string, message: any)=>{
            message = message.toString();
            console.log(message + " " + topic);
        });
    }
}

export { MQTTHandler }