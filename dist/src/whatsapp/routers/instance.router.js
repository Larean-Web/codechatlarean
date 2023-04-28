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
exports.InstanceRouter = void 0;
const express_1 = require("express");
const validate_schema_1 = require("../../validate/validate.schema");
const instance_dto_1 = require("../dto/instance.dto");
const whatsapp_module_1 = require("../whatsapp.module");
const abstract_router_1 = require("../abstract/abstract.router");
const index_router_1 = require("./index.router");
const auth_service_1 = require("../services/auth.service");
class InstanceRouter extends abstract_router_1.RouterBroker {
    constructor(configService, ...guards) {
        super();
        this.configService = configService;
        this.router = (0, express_1.Router)();
        const auth = configService.get('AUTHENTICATION');
        this.router
            .post('/create', ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.createInstance(instance),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .get(this.routerPath('connect'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.connectToWhatsapp(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .get(this.routerPath('connectionState'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.connectionState(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .get(this.routerPath('fetchInstances', false), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: null,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.fetchInstances(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .delete(this.routerPath('logout'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.logout(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .delete(this.routerPath('delete'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.instanceController.deleteInstance(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }));
        if (auth.TYPE === 'jwt') {
            this.router.put('/refreshToken', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.dataValidate({
                    request: req,
                    schema: validate_schema_1.oldTokenSchema,
                    ClassRef: auth_service_1.OldToken,
                    execute: (_, data) => whatsapp_module_1.instanceController.refreshToken(_, data),
                });
                return res.status(index_router_1.HttpStatus.CREATED).json(response);
            }));
        }
    }
}
exports.InstanceRouter = InstanceRouter;
