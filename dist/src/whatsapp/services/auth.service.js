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
exports.AuthService = exports.OldToken = void 0;
const package_json_1 = require("../../../package.json");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_config_1 = require("../../config/logger.config");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../../exceptions");
const axios_1 = __importDefault(require("axios"));
class OldToken {
}
exports.OldToken = OldToken;
class AuthService {
    constructor(configService, waMonitor, repository) {
        this.configService = configService;
        this.waMonitor = waMonitor;
        this.repository = repository;
        this.logger = new logger_config_1.Logger(AuthService.name);
    }
    jwt(instance) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const jwtOpts = this.configService.get('AUTHENTICATION').JWT;
            const token = (0, jsonwebtoken_1.sign)({
                instanceName: instance.instanceName,
                apiName: package_json_1.name,
                tokenId: (0, uuid_1.v4)(),
            }, jwtOpts.SECRET, { expiresIn: jwtOpts.EXPIRIN_IN, encoding: 'utf8', subject: 'g-t' });
            const auth = yield this.repository.auth.create({ jwt: token }, instance.instanceName);
            if (auth['error']) {
                this.logger.error({
                    localError: AuthService.name + '.jwt',
                    error: auth['error'],
                });
                throw new exceptions_1.BadRequestException('Authentication error', (_a = auth['error']) === null || _a === void 0 ? void 0 : _a.toString());
            }
            return { jwt: token };
        });
    }
    apikey(instance) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const apikey = (0, uuid_1.v4)().toUpperCase();
            const auth = yield this.repository.auth.create({ apikey }, instance.instanceName);
            if (auth['error']) {
                this.logger.error({
                    localError: AuthService.name + '.jwt',
                    error: auth['error'],
                });
                throw new exceptions_1.BadRequestException('Authentication error', (_a = auth['error']) === null || _a === void 0 ? void 0 : _a.toString());
            }
            return { apikey };
        });
    }
    generateHash(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.configService.get('AUTHENTICATION');
            return (yield this[options.TYPE](instance));
        });
    }
    refreshToken({ oldToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, class_validator_1.isJWT)(oldToken)) {
                throw new exceptions_1.BadRequestException('Invalid "oldToken"');
            }
            try {
                const jwtOpts = this.configService.get('AUTHENTICATION').JWT;
                const decode = (0, jsonwebtoken_1.verify)(oldToken, jwtOpts.SECRET, {
                    ignoreExpiration: true,
                });
                const tokenStore = yield this.repository.auth.find(decode.instanceName);
                const decodeTokenStore = (0, jsonwebtoken_1.verify)(tokenStore.jwt, jwtOpts.SECRET, {
                    ignoreExpiration: true,
                });
                if (decode.tokenId !== decodeTokenStore.tokenId) {
                    throw new exceptions_1.BadRequestException('Invalid "oldToken"');
                }
                const token = {
                    jwt: (yield this.jwt({ instanceName: decode.instanceName })).jwt,
                    instanceName: decode.instanceName,
                };
                try {
                    const webhook = yield this.repository.webhook.find(decode.instanceName);
                    if (webhook.enabled &&
                        this.configService.get('WEBHOOK').EVENTS.NEW_JWT_TOKEN) {
                        const httpService = axios_1.default.create({ baseURL: webhook.url });
                        yield httpService.post('', {
                            event: 'new.jwt',
                            instance: decode.instanceName,
                            data: token,
                        }, { params: { owner: this.waMonitor.waInstances[decode.instanceName].wuid } });
                    }
                }
                catch (error) {
                    this.logger.error(error);
                }
                return token;
            }
            catch (error) {
                this.logger.error({
                    localError: AuthService.name + '.refreshToken',
                    error,
                });
                throw new exceptions_1.BadRequestException('Invalid "oldToken"');
            }
        });
    }
}
exports.AuthService = AuthService;
