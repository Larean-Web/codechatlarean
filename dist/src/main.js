"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const env_config_1 = require("./config/env.config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const path_1 = require("path");
const error_config_1 = require("./config/error.config");
const logger_config_1 = require("./config/logger.config");
const path_config_1 = require("./config/path.config");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const index_router_1 = require("./whatsapp/routers/index.router");
require("express-async-errors");
const server_up_1 = require("./utils/server-up");
function initWA() {
    whatsapp_module_1.waMonitor.loadInstance();
}
function bootstrap() {
    initWA();
    const logger = new logger_config_1.Logger('SERVER');
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin(requestOrigin, callback) {
            const { ORIGIN } = env_config_1.configService.get('CORS');
            !requestOrigin ? (requestOrigin = '*') : undefined;
            if (ORIGIN.indexOf(requestOrigin) !== -1) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        methods: [...env_config_1.configService.get('CORS').METHODS],
        credentials: env_config_1.configService.get('CORS').CREDENTIALS,
    }), (0, express_1.urlencoded)({ extended: true, limit: '50mb' }), (0, express_1.json)({ limit: '50mb' }), (0, compression_1.default)());
    app.set('view engine', 'hbs');
    app.set('views', (0, path_1.join)(path_config_1.ROOT_DIR, 'views'));
    app.use(express_1.default.static((0, path_1.join)(path_config_1.ROOT_DIR, 'public')));
    app.use('/', index_router_1.router);
    app.use((err, req, res, next) => {
        if (err) {
            return res.status(err['status'] || 500).json(err);
        }
    }, (req, res, next) => {
        const { method, url } = req;
        res.status(index_router_1.HttpStatus.NOT_FOUND).json({
            status: index_router_1.HttpStatus.NOT_FOUND,
            message: `Cannot ${method.toUpperCase()} ${url}`,
            error: 'Not Found',
        });
        next();
    });
    const httpServer = env_config_1.configService.get('SERVER');
    server_up_1.ServerUP.app = app;
    const server = server_up_1.ServerUP[httpServer.TYPE];
    server().listen(httpServer.PORT, () => logger.log(httpServer.TYPE.toUpperCase() + ' - ON: ' + httpServer.PORT));
    (0, error_config_1.onUnexpectedError)();
}
bootstrap();
