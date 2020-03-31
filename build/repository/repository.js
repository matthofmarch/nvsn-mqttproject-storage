"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.ip = "172.18.55.97";
    }
    Object.defineProperty(MongoRepository, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MongoRepository.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose.connect("mongodb://" + this.ip + ":27017/test", { useNewUrlParser: true })];
                    case 1:
                        _a.sent();
                        this.db = mongoose.connection;
                        this.db.on('error', console.error.bind(console, 'connection error:'));
                        this.db.once('open', function () {
                            console.log("MongoDB is connected!");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                mongoose.connection.close();
                return [2 /*return*/];
            });
        });
    };
    MongoRepository.prototype.addSensor = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (s === null || s === undefined)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, s.save()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.addReadingToSensor = function (s, r) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (s === null || s === undefined || r === null || r === undefined)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, s.collection.updateOne({ name: "office" }, { $push: { measurements: { r: r } } })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.getMeasurements = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (s === null || s === undefined)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, s.collection.findOne({ name: "office" })];
                    case 2: return [2 /*return*/, (_a.sent()).measurements];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.findSensorByName = function (name) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (name === null || name === undefined || name === "")
                            return [2 /*return*/, null];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_a = this.db) === null || _a === void 0 ? void 0 : _a.collection("sensor").findOne({ name: "office" }))];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.findInTimeSpan = function (start, end, sensor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (name === null || name === undefined || name === "")
                    return [2 /*return*/, null];
                try {
                    /*const a = {
                        $elemMatch: {
                            measurements: {
                                time: {
                                    $gte: start, $lte: end
                                }
                            }
                        }
                    }
        
                    return await this.db?.collection("sensor").findOne({ name: sensor.name }, a);     */
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    MongoRepository._instance = new MongoRepository();
    return MongoRepository;
}());
exports.default = MongoRepository;
