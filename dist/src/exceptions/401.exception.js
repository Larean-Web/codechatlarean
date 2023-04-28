"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const index_router_1 = require("../whatsapp/routers/index.router");
class UnauthorizedException {
    constructor(...objectError) {
        throw {
            status: index_router_1.HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
            message: objectError.length > 0 ? objectError : undefined,
        };
    }
}
exports.UnauthorizedException = UnauthorizedException;
