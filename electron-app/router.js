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
var express_1 = require("express");
var nxlogis_ts_1 = require("nxlogis-ts");
var railblue_ts_1 = require("railblue-ts");
var router = express_1.Router();
router.get('/ddtl2', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var api, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                api = new nxlogis_ts_1.DisplayDriveTrainList2(new Date());
                _b = (_a = res).json;
                return [4 /*yield*/, api.GetResult()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
router.get('/GetMetroArriveInfo', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var api, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (typeof req.query.name != "string")
                        return [2 /*return*/];
                    api = new railblue_ts_1.GetMetroArriveInfo(req.query.name);
                    _b = (_a = res).send;
                    return [4 /*yield*/, api.GetParse()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
router.get('/stationtrains', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        function Time(str) {
            var date = new Date();
            var arr = str.split(':');
            date.setHours(parseInt(arr[0]));
            date.setMinutes(parseInt(arr[1]));
            date.setSeconds(parseInt(arr[2]));
            return date;
        }
        var api, data, trains, queryName, out, i, api, data, check;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof req.query.name != "string")
                        return [2 /*return*/, res.json([])];
                    api = new nxlogis_ts_1.DisplayDriveTrainList2(new Date());
                    return [4 /*yield*/, api.GetResult()];
                case 1:
                    data = _a.sent();
                    trains = data.data.trains;
                    trains = trains.filter(function (value) {
                        var dep = Time(value.dep_p_ts);
                        return dep > new Date();
                    });
                    queryName = req.query.name;
                    out = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < trains.length)) return [3 /*break*/, 5];
                    if (out.length >= 10)
                        return [3 /*break*/, 4];
                    if (trains[i].ops_dd != nxlogis_ts_1.SixDigitDate(new Date()))
                        return [3 /*break*/, 4];
                    api = new nxlogis_ts_1.SearchTrainInfo(new Date(), trains[i].trn_no);
                    return [4 /*yield*/, api.GetResult()];
                case 3:
                    data = _a.sent();
                    data = data.data.schedule;
                    if (data == undefined)
                        return [3 /*break*/, 4];
                    check = data.some(function (value) { return value.stn_nm == decodeURI(queryName) && Time(value.arv_p_ts).getMinutes + value.arv_delay >= new Date().getMinutes(); });
                    if (check)
                        out.push({ schedule: data, train: trains[i] });
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    res.json(out);
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
