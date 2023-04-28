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
exports.InstanceController = void 0;
const base_1 = require("@codechat/base");
const exceptions_1 = require("../../exceptions");
const whatsapp_service_1 = require("../services/whatsapp.service");
const logger_config_1 = require("../../config/logger.config");
class InstanceController {
    constructor(waMonitor, configService, repository, eventEmitter, authService) {
        this.waMonitor = waMonitor;
        this.configService = configService;
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.authService = authService;
        this.logger = new logger_config_1.Logger(InstanceController.name);
    }
    createInstance({ instanceName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new whatsapp_service_1.WAStartupService(this.configService, this.eventEmitter, this.repository);
            instance.instanceName = instanceName;
            this.waMonitor.waInstances[instance.instanceName] = instance;
            this.waMonitor.delInstanceTime(instance.instanceName);
            const hash = yield this.authService.generateHash({
                instanceName: instance.instanceName,
            });
            return {
                instance: {
                    instanceName: instance.instanceName,
                    status: 'created',
                },
                hash,
            };
        });
    }
    connectToWhatsapp({ instanceName }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = this.waMonitor.waInstances[instanceName];
                const state = (_a = instance.connectionStatus) === null || _a === void 0 ? void 0 : _a.state;
                switch (state) {
                    case 'close':
                        yield instance.connectToWhatsapp();
                        yield (0, base_1.delay)(2000);
                        return instance.qrCode;
                    case 'connecting':
                        return instance.qrCode;
                    default:
                        return yield this.connectionState({ instanceName });
                }
            }
            catch (error) {
                this.logger.log(error);
            }
        });
    }
    connectionState({ instanceName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.waMonitor.waInstances[instanceName].connectionStatus;
        });
    }
    fetchInstances({ instanceName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (instanceName) {
                return this.waMonitor.instanceInfo(instanceName);
            }
            return this.waMonitor.instanceInfo();
        });
    }
    logout({ instanceName }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_b = (_a = this.waMonitor.waInstances[instanceName]) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.logout('Log out instance: ' + instanceName));
                return { error: false, message: 'Instance logged out' };
            }
            catch (error) {
                throw new exceptions_1.InternalServerErrorException(error.toString());
            }
        });
    }
    deleteInstance({ instanceName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const stateConn = yield this.connectionState({ instanceName });
            if (stateConn.state === 'open') {
                throw new exceptions_1.BadRequestException([
                    'Deletion failed',
                    'The instance needs to be disconnected',
                ]);
            }
            try {
                delete this.waMonitor.waInstances[instanceName];
                return { error: false, message: 'Instance deleted' };
            }
            catch (error) {
                throw new exceptions_1.BadRequestException(error.toString());
            }
        });
    }
    refreshToken(_, oldToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.refreshToken(oldToken);
        });
    }
}
exports.InstanceController = InstanceController;
