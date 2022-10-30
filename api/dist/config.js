"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_URL = exports.DB_PASSWORD = exports.DB_USER = exports.frontend_url = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT || '4000';
exports.frontend_url = process.env.FRONTEND || '';
exports.DB_USER = process.env.DB_USER;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_URL = process.env.DB_URL;
exports.DB_NAME = process.env.DB_NAME;
