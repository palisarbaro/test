"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseOk = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function responseOk(res, obj) {
    if (!obj) {
        obj = {};
    }
    if (Array.isArray(obj)) {
        throw new Error('Arrays are not allowed');
    }
    if (typeof obj !== 'object') {
        obj = { data: obj };
    }
    return res.json(Object.assign(Object.assign({}, obj), { status: 'ok' }));
}
exports.responseOk = responseOk;
