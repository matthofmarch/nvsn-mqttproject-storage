"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mqtthandler_1 = require("./mqtthandler");
var body_parser_1 = __importDefault(require("body-parser"));
var repository_1 = __importDefault(require("./repository/repository"));
var isensor_1 = __importDefault(require("./entities/isensor"));
var ireading_1 = __importDefault(require("./entities/ireading"));
var app = express_1.default();
var port = 3000; // default port to listen
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var mqttClient = new mqtthandler_1.MQTTHandler('mqtt://52.157.91.193', ['#']);
var repo = new repository_1.default();
app.get("/", function (req, res) {
    console.log('Express Home');
    repo.connect();
});
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("server started at http://localhost:" + port);
});
function crudTest() {
    repo.connect();
    var s = new isensor_1.default({ name: "tree", type: "co2", unit: "%" });
    var r = new ireading_1.default({ value: 50, time: new Date(2020, 2, 3, 14, 34, 2) });
    //repo.addSensor(s);
    repo.addReadingToSensor(s, r);
    repo.getReadings(s).then(function (x) { return x.map(function (y) { return console.log(y); }); });
}
crudTest();
