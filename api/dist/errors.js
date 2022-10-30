"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.BadRequest = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
class BadRequest extends ApiError {
    constructor(message = 'Bad request') {
        super(400, message);
    }
}
exports.BadRequest = BadRequest;
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.status).json({ status: 'error', error: err.message });
    }
    else {
        console.log(err.stack);
        console.log(err);
        res.sendStatus(500);
    }
}
exports.errorHandler = errorHandler;
