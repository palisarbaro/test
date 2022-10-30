"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const SeqUser_1 = __importDefault(require("./SeqUser"));
const SeqDepartment_1 = __importDefault(require("./SeqDepartment"));
const SeqPc_1 = __importDefault(require("./SeqPc"));
const SeqUser_2 = require("./SeqUser");
const SeqDepartment_2 = require("./SeqDepartment");
const SeqPc_2 = require("./SeqPc");
const config_1 = require("../config");
const logStream = fs_1.default.createWriteStream('./sql.log', { 'flags': 'a' });
const options = { logging: (msg) => logStream.write(msg) };
let sequelize = new sequelize_1.Sequelize(`postgres://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_URL}/${config_1.DB_NAME}`, options);
if (process.env.NODE_ENV === 'test') {
    sequelize = new sequelize_1.Sequelize('sqlite::memory:', options);
}
const models_init = [SeqUser_1.default, SeqDepartment_1.default, SeqPc_1.default];
for (const model_init of models_init) {
    model_init(sequelize);
}
SeqPc_2.SeqPC.hasOne(SeqUser_2.SeqUser);
SeqUser_2.SeqUser.belongsTo(SeqPc_2.SeqPC);
SeqDepartment_2.SeqDepartment.hasMany(SeqUser_2.SeqUser);
SeqUser_2.SeqUser.belongsTo(SeqDepartment_2.SeqDepartment);
exports.default = sequelize;
