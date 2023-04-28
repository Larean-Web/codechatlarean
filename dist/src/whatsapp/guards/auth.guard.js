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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../config/env.config");
const logger_config_1 = require("../../config/logger.config");
const package_json_1 = require("../../../package.json");
const exceptions_1 = require("../../exceptions");
const whatsapp_module_1 = require("../whatsapp.module");
const logger = new logger_config_1.Logger('GUARD');
function jwtGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = req.get('apikey');
        if (key && env_config_1.configService.get('AUTHENTICATION').API_KEY.KEY !== key) {
            throw new exceptions_1.UnauthorizedException();
        }
        if (env_config_1.configService.get('AUTHENTICATION').API_KEY.KEY === key) {
            return next();
        }
        if ((req.originalUrl.includes('/instance/create') ||
            req.originalUrl.includes('/instance/fetchInstances')) &&
            !key) {
            throw new exceptions_1.ForbiddenException('Missing global api key', 'The global api key must be set');
        }
        const jwtOpts = env_config_1.configService.get('AUTHENTICATION').JWT;
        try {
            const [bearer, token] = req.get('authorization').split(' ');
            if (bearer.toLowerCase() !== 'bearer') {
                throw new exceptions_1.UnauthorizedException();
            }
            if (!(0, class_validator_1.isJWT)(token)) {
                throw new exceptions_1.UnauthorizedException();
            }
            const param = req.params;
            const decode = jsonwebtoken_1.default.verify(token, jwtOpts.SECRET, {
                ignoreExpiration: jwtOpts.EXPIRIN_IN === 0,
            });
            if (param.instanceName !== decode.instanceName || package_json_1.name !== decode.apiName) {
                throw new exceptions_1.UnauthorizedException();
            }
            return next();
        }
        catch (error) {
            logger.error(error);
            throw new exceptions_1.UnauthorizedException();
        }
    });
}
function apikey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const env = env_config_1.configService.get('AUTHENTICATION').API_KEY;
        const key = req.get('apikey');
        if (env.KEY === key) {
            return next();
        }
        if ((req.originalUrl.includes('/instance/create') ||
            req.originalUrl.includes('/instance/fetchInstances')) &&
            !key) {
            throw new exceptions_1.ForbiddenException('Missing global api key', 'The global api key must be set');
        }
        try {
            const param = req.params;
            const instanceKey = yield whatsapp_module_1.repository.auth.find(param.instanceName);
            if (instanceKey.apikey === key) {
                return next();
            }
        }
        catch (error) { }
        throw new exceptions_1.UnauthorizedException();
    });
}
exports.authGuard = { jwt: jwtGuard, apikey };
