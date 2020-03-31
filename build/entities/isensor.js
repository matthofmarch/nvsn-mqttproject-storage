"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var ireading_1 = require("./ireading");
;
exports.SensorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    unit: { type: String, required: true },
    measurements: { type: [ireading_1.MeasurementSchema] }
});
var Sensor = mongoose.model('Sensor', exports.SensorSchema);
exports.default = Sensor;