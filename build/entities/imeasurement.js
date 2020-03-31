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
;
exports.MeasurementSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    time: { type: Date, required: true }
});
var Measurement = mongoose.model('Measurement', exports.MeasurementSchema);
exports.default = Measurement;
