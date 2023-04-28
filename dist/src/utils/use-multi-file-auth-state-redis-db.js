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
exports.useMultiFileAuthStateRedisDb = void 0;
const base_1 = require("@codechat/base");
const redis_client_1 = require("../db/redis.client");
const logger_config_1 = require("../config/logger.config");
function useMultiFileAuthStateRedisDb(redisUri, instanceName) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_config_1.Logger(useMultiFileAuthStateRedisDb.name);
        const cache = new redis_client_1.RedisCache(redisUri, instanceName);
        const writeData = (data, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cache.writeData(key, data);
            }
            catch (error) {
                return logger.error({ localError: 'writeData', error });
            }
        });
        const readData = (key) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cache.readData(key);
            }
            catch (error) {
                logger.error({ readData: 'writeData', error });
                return;
            }
        });
        const removeData = (key) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cache.removeData(key);
            }
            catch (error) {
                logger.error({ readData: 'removeData', error });
            }
        });
        const creds = (yield readData('creds')) || (0, base_1.initAuthCreds)();
        return {
            state: {
                creds,
                keys: {
                    get: (type, ids) => __awaiter(this, void 0, void 0, function* () {
                        const data = {};
                        yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                            let value = yield readData(`${type}-${id}`);
                            if (type === 'app-state-sync-key' && value) {
                                value = base_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        })));
                        return data;
                    }),
                    set: (data) => __awaiter(this, void 0, void 0, function* () {
                        const tasks = [];
                        for (const category in data) {
                            for (const id in data[category]) {
                                const value = data[category][id];
                                const key = `${category}-${id}`;
                                tasks.push(value ? yield writeData(value, key) : yield removeData(key));
                            }
                        }
                        yield Promise.all(tasks);
                    }),
                },
            },
            saveCreds: () => __awaiter(this, void 0, void 0, function* () {
                return yield writeData(creds, 'creds');
            }),
        };
    });
}
exports.useMultiFileAuthStateRedisDb = useMultiFileAuthStateRedisDb;
