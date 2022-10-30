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
const SeqPc_1 = require("../models/SeqPc");
const SeqUser_1 = require("../models/SeqUser");
class UserService {
    getUsers() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield SeqUser_1.SeqUser.findAll({ include: [SeqDepartment_1.SeqDepartment, SeqPc_1.SeqPC], order: [['id', 'ASC']], });
            const result = [];
            for (const user of users) {
                result.push({
                    id: user.id,
                    salary: user.salary,
                    name: user.name,
                    computer: { name: (_a = user.SeqPC) === null || _a === void 0 ? void 0 : _a.name, id: (_b = user.SeqPC) === null || _b === void 0 ? void 0 : _b.id },
                    department: { name: (_c = user.SeqDepartment) === null || _c === void 0 ? void 0 : _c.name, id: (_d = user.SeqDepartment) === null || _d === void 0 ? void 0 : _d.id }
                });
            }
            return result;
        });
    }
    addUser(name, salary, pc, department) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqUser_1.SeqUser.create({ name, salary, SeqPCId: pc, SeqDepartmentId: department });
        });
    }
    updateDepartment(id, department) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqUser_1.SeqUser.update({ SeqDepartmentId: department }, { where: { id } });
        });
    }
}
exports.default = UserService;
