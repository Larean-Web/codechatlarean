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
exports.RedisCache = void 0;
const client_1 = require("@redis/client");
const logger_config_1 = require("../config/logger.config");
const base_1 = require("@codechat/base");
class RedisCache {
    constructor(uri, instanceName) {
        this.instanceName = instanceName;
        this.logger = new logger_config_1.Logger(RedisCache.name);
        this.client = (0, client_1.createClient)({ url: uri });
        this.client.connect();
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hKeys(this.instanceName);
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    writeData(field, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = JSON.stringify(data, base_1.BufferJSON.replacer);
                return yield this.client.hSet(this.instanceName, field, json);
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    readData(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.client.hGet(this.instanceName, field);
                if (data) {
                    return JSON.parse(data, base_1.BufferJSON.reviver);
                }
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    removeData(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.hDel(this.instanceName, field);
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    delAll(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.del(hash || this.instanceName);
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
}
exports.RedisCache = RedisCache;
