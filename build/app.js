"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mqtthandler_1 = require("./mqtthandler");
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var port = 3000; // default port to listen
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var mqttClient = new mqtthandler_1.MQTTHandler('mqtt://52.157.91.193', ['#']);
app.get("/", function (req, res) {
    console.log('Express Home');
});
app.get("/between", function (req, res) {
});
app.get("/max", function (req, res) {
    console.log('Max: ');
});
app.get("/min", function (req, res) {
    console.log('Express Home');
});
app.get("/average", function (req, res) {
    console.log('Express Home');
});
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("server started at http://localhost:" + port);
});
