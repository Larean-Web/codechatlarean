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
exports.useMultiFileAuthStateDb = void 0;
const base_1 = require("@codechat/base");
const env_config_1 = require("../config/env.config");
const logger_config_1 = require("../config/logger.config");
const db_connect_1 = require("../db/db.connect");
function useMultiFileAuthStateDb(coll) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_config_1.Logger(useMultiFileAuthStateDb.name);
        const client = db_connect_1.dbserver.getClient();
        const collection = client
            .db(env_config_1.configService.get('DATABASE').CONNECTION.DB_PREFIX_NAME + '-instances')
            .collection(coll);
        const writeData = (data, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                return yield collection.replaceOne({ _id: key }, JSON.parse(JSON.stringify(data, base_1.BufferJSON.replacer)), { upsert: true });
            }
            catch (_a) { }
        });
        const readData = (key) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                const data = yield collection.findOne({ _id: key });
                const creds = JSON.stringify(data);
                return JSON.parse(creds, base_1.BufferJSON.reviver);
            }
            catch (_b) { }
        });
        const removeData = (key) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                return yield collection.deleteOne({ _id: key });
            }
            catch (_c) { }
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
                                tasks.push(value ? writeData(value, key) : removeData(key));
                            }
                        }
                        yield Promise.all(tasks);
                    }),
                },
            },
            saveCreds: () => __awaiter(this, void 0, void 0, function* () {
                return writeData(creds, 'creds');
            }),
        };
    });
}
exports.useMultiFileAuthStateDb = useMultiFileAuthStateDb;
