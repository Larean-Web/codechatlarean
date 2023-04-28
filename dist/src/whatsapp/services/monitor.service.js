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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAMonitoringService = void 0;
const fs_1 = require("fs");
const whatsapp_service_1 = require("./whatsapp.service");
const path_config_1 = require("../../config/path.config");
const path_1 = require("path");
const logger_config_1 = require("../../config/logger.config");
const exceptions_1 = require("../../exceptions");
const redis_client_1 = require("../../db/redis.client");
class WAMonitoringService {
    constructor(eventEmitter, configService, repository) {
        var _a;
        this.eventEmitter = eventEmitter;
        this.configService = configService;
        this.repository = repository;
        this.db = {};
        this.redis = {};
        this.logger = new logger_config_1.Logger(WAMonitoringService.name);
        this.waInstances = {};
        this.removeInstance();
        this.noConnection();
        this.delInstanceFiles();
        Object.assign(this.db, configService.get('DATABASE'));
        Object.assign(this.redis, configService.get('REDIS'));
        this.dbInstance = this.db.ENABLED
            ? (_a = this.repository.dbServer) === null || _a === void 0 ? void 0 : _a.db(this.db.CONNECTION.DB_PREFIX_NAME + '-instances')
            : null;
    }
    delInstanceTime(instance) {
        const time = this.configService.get('DEL_INSTANCE');
        if (typeof time === 'number' && time > 0) {
            setTimeout(() => {
                var _a, _b;
                if (((_b = (_a = this.waInstances[instance]) === null || _a === void 0 ? void 0 : _a.connectionStatus) === null || _b === void 0 ? void 0 : _b.state) !== 'open') {
                    delete this.waInstances[instance];
                }
            }, 1000 * 60 * time);
        }
    }
    instanceInfo(instanceName) {
        var _a, e_1, _b, _c;
        var _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (instanceName && !this.waInstances[instanceName]) {
                throw new exceptions_1.NotFoundException(`Instance "${instanceName}" not found`);
            }
            const instances = [];
            try {
                for (var _e = true, _f = __asyncValues(Object.entries(this.waInstances)), _g; _g = yield _f.next(), _a = _g.done, !_a;) {
                    _c = _g.value;
                    _e = false;
                    try {
                        const [key, value] = _c;
                        if (value && value.connectionStatus.state === 'open') {
                            instances.push({
                                instance: {
                                    instanceName: key,
                                    owner: value.wuid,
                                    profileName: (yield value.getProfileName()) || 'not loaded',
                                    profilePictureUrl: value.profilePictureUrl,
                                },
                            });
                        }
                    }
                    finally {
                        _e = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return (_d = instances.find((i) => i.instance.instanceName === instanceName)) !== null && _d !== void 0 ? _d : instances;
        });
    }
    delInstanceFiles() {
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            var _a, e_2, _b, _c;
            if (this.db.ENABLED && this.db.SAVE_DATA.INSTANCE) {
                const collections = yield this.dbInstance.collections();
                collections.forEach((collection) => __awaiter(this, void 0, void 0, function* () {
                    const name = collection.namespace.replace(/^[\w-]+./, '');
                    yield this.dbInstance.collection(name).deleteMany({
                        $or: [
                            { _id: { $regex: /^app.state.*/ } },
                            { _id: { $regex: /^session-.*/ } },
                        ],
                    });
                }));
            }
            else {
                const dir = (0, fs_1.opendirSync)(path_config_1.INSTANCE_DIR, { encoding: 'utf-8' });
                try {
                    for (var _d = true, dir_1 = __asyncValues(dir), dir_1_1; dir_1_1 = yield dir_1.next(), _a = dir_1_1.done, !_a;) {
                        _c = dir_1_1.value;
                        _d = false;
                        try {
                            const dirent = _c;
                            if (dirent.isDirectory()) {
                                const files = (0, fs_1.readdirSync)((0, path_1.join)(path_config_1.INSTANCE_DIR, dirent.name), {
                                    encoding: 'utf-8',
                                });
                                files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                                    if (file.match(/^app.state.*/) || file.match(/^session-.*/)) {
                                        (0, fs_1.rmSync)((0, path_1.join)(path_config_1.INSTANCE_DIR, dirent.name, file), {
                                            recursive: true,
                                            force: true,
                                        });
                                    }
                                }));
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = dir_1.return)) yield _b.call(dir_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }), 3600 * 1000 * 2);
    }
    cleaningUp(instanceName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db.ENABLED && this.db.SAVE_DATA.INSTANCE) {
                yield this.repository.dbServer.connect();
                const collections = yield this.dbInstance.collections();
                if (collections.length > 0) {
                    yield this.dbInstance.dropCollection(instanceName);
                }
                return;
            }
            if (this.redis.ENABLED) {
                const redisCache = new redis_client_1.RedisCache(this.redis.URI, instanceName);
                yield redisCache.delAll();
                return;
            }
            (0, fs_1.rmSync)((0, path_1.join)(path_config_1.INSTANCE_DIR, instanceName), { recursive: true, force: true });
        });
    }
    loadInstance() {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const set = (name) => __awaiter(this, void 0, void 0, function* () {
                const instance = new whatsapp_service_1.WAStartupService(this.configService, this.eventEmitter, this.repository);
                instance.instanceName = name;
                yield instance.connectToWhatsapp();
                this.waInstances[name] = instance;
            });
            try {
                if (this.db.ENABLED && this.db.SAVE_DATA.INSTANCE) {
                    yield this.repository.dbServer.connect();
                    const collections = yield this.dbInstance.collections();
                    if (collections.length > 0) {
                        collections.forEach((coll) => __awaiter(this, void 0, void 0, function* () { return yield set(coll.namespace.replace(/^[\w-]+\./, '')); }));
                    }
                    return;
                }
                const dir = (0, fs_1.opendirSync)(path_config_1.INSTANCE_DIR, { encoding: 'utf-8' });
                try {
                    for (var _d = true, dir_2 = __asyncValues(dir), dir_2_1; dir_2_1 = yield dir_2.next(), _a = dir_2_1.done, !_a;) {
                        _c = dir_2_1.value;
                        _d = false;
                        try {
                            const dirent = _c;
                            if (dirent.isDirectory()) {
                                const files = (0, fs_1.readdirSync)((0, path_1.join)(path_config_1.INSTANCE_DIR, dirent.name), {
                                    encoding: 'utf-8',
                                });
                                if (files.length === 0) {
                                    (0, fs_1.rmSync)((0, path_1.join)(path_config_1.INSTANCE_DIR, dirent.name), { recursive: true, force: true });
                                    break;
                                }
                                yield set(dirent.name);
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = dir_2.return)) yield _b.call(dir_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    removeInstance() {
        this.eventEmitter.on('remove.instance', (instanceName) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.waInstances[instanceName] = undefined;
            }
            catch (_a) { }
            try {
                this.cleaningUp(instanceName);
            }
            finally {
                this.logger.warn(`Instance "${instanceName}" - REMOVED`);
            }
        }));
    }
    noConnection() {
        this.eventEmitter.on('no.connection', (instanceName) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.waInstances[instanceName] = undefined;
                this.cleaningUp(instanceName);
            }
            catch (error) {
                this.logger.error({
                    localError: 'noConnection',
                    warn: 'Error deleting instance from memory.',
                    error,
                });
            }
            finally {
                this.logger.warn(`Instance "${instanceName}" - NOT CONNECTION`);
            }
        }));
    }
}
exports.WAMonitoringService = WAMonitoringService;
