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
const SeqDepartment_1 = require("../models/SeqDepartment");
const SeqUser_1 = require("../models/SeqUser");
class DepartmentService {
    getDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield SeqDepartment_1.SeqDepartment.findAll({ order: [['id', 'ASC']], include: SeqUser_1.SeqUser });
            const result = [];
            for (const department of departments) {
                result.push({
                    id: department.id,
                    name: department.name,
                    inuse: department.SeqUsers.length != 0
                });
            }
            return result;
        });
    }
    addDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqDepartment_1.SeqDepartment.create({ name });
        });
    }
    deleteDepartments(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqDepartment_1.SeqDepartment.destroy({ where: { id: ids } });
        });
    }
}
exports.default = DepartmentService;
