"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeqPC = void 0;
const sequelize_1 = require("sequelize");
class SeqPC extends sequelize_1.Model {
}
exports.SeqPC = SeqPC;
function default_1(sequelize) {
    return SeqPC.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
    }, { timestamps: false, sequelize });
}
exports.default = default_1;
