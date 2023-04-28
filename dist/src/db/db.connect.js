"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbserver = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("../config/env.config");
const logger_config_1 = require("../config/logger.config");
const logger = new logger_config_1.Logger('Db Connection');
exports.db = env_config_1.configService.get('DATABASE');
exports.dbserver = exports.db.ENABLED
    ? mongoose_1.default.createConnection(exports.db.CONNECTION.URI, {
        dbName: exports.db.CONNECTION.DB_PREFIX_NAME + '-whatsapp-api',
    })
    : null;
exports.db.ENABLED ? logger.info('ON - dbName: ' + exports.dbserver['$dbName']) : null;
