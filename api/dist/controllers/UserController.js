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
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const utils_1 = require("../utils");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getUsers();
                (0, utils_1.responseOk)(res, { users });
            }
            catch (err) {
                next(err);
            }
        });
    }
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const salary = parseInt(req.body.salary);
                const pc = req.body.pc;
                const department = req.body.department;
                if (typeof name != 'string') {
                    throw new errors_1.BadRequest('name must be a string');
                }
                if (!name) {
                    throw new errors_1.BadRequest('name cannot be empty');
                }
                if (pc != null && typeof pc != 'number') {
                    throw new errors_1.BadRequest('pc must be null or number');
                }
                if (department != null && typeof department != 'number') {
                    throw new errors_1.BadRequest('department must be null or number');
                }
                if (Number.isNaN(salary) || salary < 0) {
                    throw new errors_1.BadRequest('salary must be a positive number');
                }
                try {
                    yield this.userService.addUser(name, salary, pc, department);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                catch (e) {
                    if (e.name == 'SequelizeUniqueConstraintError') {
                        throw new errors_1.BadRequest('PC already in use');
                    }
                    console.log(e);
                }
                (0, utils_1.responseOk)(res, {});
            }
            catch (err) {
                next(err);
            }
        });
    }
    pathcUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const department = req.body.department;
                if (typeof id != 'number') {
                    throw new errors_1.BadRequest('name must be a number');
                }
                if (department != null && typeof department != 'number') {
                    throw new errors_1.BadRequest('department must be null or number');
                }
                yield this.userService.updateDepartment(id, department);
                (0, utils_1.responseOk)(res, {});
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
