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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
//import cors from 'cors'
const dbInstance_1 = __importDefault(require("./models/dbInstance"));
const router_1 = __importDefault(require("./router"));
const errors_1 = require("./errors");
const config_1 = require("./config");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//app.use(cors({ origin: frontend_url, methods: ['GET', 'POST'], credentials: true, optionsSuccessStatus: 200 }))
exports.app.use('/api', router_1.default);
exports.app.use(errors_1.errorHandler);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.app.listen(config_1.port, () => {
                console.log(`Example app listening on port ${config_1.port}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
dbInstance_1.default.sync({ alter: true }).then(start);
