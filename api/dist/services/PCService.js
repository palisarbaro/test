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
const SeqPc_1 = require("../models/SeqPc");
const SeqUser_1 = require("../models/SeqUser");
class PCService {
    getPC() {
        return __awaiter(this, void 0, void 0, function* () {
            const pcs = yield SeqPc_1.SeqPC.findAll({ include: SeqUser_1.SeqUser, order: [['id', 'ASC']] });
            const result = [];
            for (const pc of pcs) {
                result.push({
                    id: pc.id,
                    name: pc.name,
                    inuse: pc.SeqUser != null
                });
            }
            return result;
        });
    }
    addPC(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqPc_1.SeqPC.create({ name });
        });
    }
    deletePCs(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SeqPc_1.SeqPC.destroy({ where: { id: ids } });
        });
    }
}
exports.default = PCService;
