import * as mqtt from 'mqtt';

const client = mqtt.connect('mqtt://52.157.91.193');
const topic = '#';

client.on('message', (topic: any, message: any)=>{
    message = message.toString();
    console.log(message + " " + topic);
})

client.on('connect', () =>{
    client.subscribe(topic)
})