"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = __importStar(require("mqtt"));
var client = mqtt.connect('mqtt://52.157.91.193');
var topic = '#';
client.on('message', function (topic, message) {
    message = message.toString();
    console.log(message + " " + topic);
});
client.on('connect', function () {
    client.subscribe(topic);
});
