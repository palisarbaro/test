"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pcController = exports.departmentController = exports.userController = void 0;
const UserController_1 = __importDefault(require("./UserController"));
const DepartmentController_1 = __importDefault(require("./DepartmentController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const DepartmentService_1 = __importDefault(require("../services/DepartmentService"));
const PCService_1 = __importDefault(require("../services/PCService"));
const PCController_1 = __importDefault(require("./PCController"));
const userService = new UserService_1.default();
const departmentService = new DepartmentService_1.default();
const pcService = new PCService_1.default();
exports.userController = new UserController_1.default(userService);
exports.departmentController = new DepartmentController_1.default(departmentService);
exports.pcController = new PCController_1.default(pcService);
