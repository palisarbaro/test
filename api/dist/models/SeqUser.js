"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeqUser = void 0;
const sequelize_1 = require("sequelize");
class SeqUser extends sequelize_1.Model {
}
exports.SeqUser = SeqUser;
function default_1(sequelize) {
    return SeqUser.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        salary: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        SeqPCId: {
            type: sequelize_1.DataTypes.INTEGER,
            unique: true
        }
    }, { timestamps: false, sequelize });
}
exports.default = default_1;
