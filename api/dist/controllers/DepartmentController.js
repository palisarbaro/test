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
class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    getDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield this.departmentService.getDepartments();
                (0, utils_1.responseOk)(res, { departments });
            }
            catch (err) {
                next(err);
            }
        });
    }
    postDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                if (typeof name != 'string') {
                    throw new errors_1.BadRequest('name must be a string');
                }
                if (!name) {
                    throw new errors_1.BadRequest('name cannot be empty');
                }
                try {
                    yield this.departmentService.addDepartment(name);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                catch (e) {
                    if (e.name == 'SequelizeUniqueConstraintError') {
                        throw new errors_1.BadRequest('Department already exists');
                    }
                    throw e;
                }
                (0, utils_1.responseOk)(res, {});
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = req.body.ids;
                if (!Array.isArray(ids)) {
                    throw new errors_1.BadRequest('ids must be an array');
                }
                for (const id of ids) {
                    if (typeof id != 'number') {
                        throw new errors_1.BadRequest(' every id must be a number');
                    }
                }
                try {
                    yield this.departmentService.deleteDepartments(ids);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                catch (e) {
                    console.log(e);
                    throw e;
                }
                (0, utils_1.responseOk)(res, {});
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = DepartmentController;
