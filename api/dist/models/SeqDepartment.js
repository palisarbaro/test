"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeqDepartment = void 0;
const sequelize_1 = require("sequelize");
class SeqDepartment extends sequelize_1.Model {
}
exports.SeqDepartment = SeqDepartment;
function default_1(sequelize) {
    return SeqDepartment.init({
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
