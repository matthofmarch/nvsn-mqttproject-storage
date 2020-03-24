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
var MQTTHandler = /** @class */ (function () {
    function MQTTHandler(url, topics) {
        var _this = this;
        this.client = mqtt.connect(url);
        topics.forEach(function (element) {
            _this.client.subscribe(element);
        });
        this.client.on('message', function (topic, message) {
            message = message.toString();
            console.log(message + " " + topic);
        });
    }
    return MQTTHandler;
}());
exports.MQTTHandler = MQTTHandler;
