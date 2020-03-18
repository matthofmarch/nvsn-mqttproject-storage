var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://52.157.91.193')
var topic = 'demo'
var message = 'Hello World!'
client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})