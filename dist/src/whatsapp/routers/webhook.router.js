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
exports.WebhookRouter = void 0;
const express_1 = require("express");
const validate_schema_1 = require("../../validate/validate.schema");
const abstract_router_1 = require("../abstract/abstract.router");
const instance_dto_1 = require("../dto/instance.dto");
const webhook_dto_1 = require("../dto/webhook.dto");
const whatsapp_module_1 = require("../whatsapp.module");
const index_router_1 = require("./index.router");
class WebhookRouter extends abstract_router_1.RouterBroker {
    constructor(...guards) {
        super();
        this.router = (0, express_1.Router)();
        this.router
            .post(this.routerPath('set'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.webhookSchema,
                ClassRef: webhook_dto_1.WebhookDto,
                execute: (instance, data) => whatsapp_module_1.webhookController.createWebhook(instance, data),
            });
            res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .get(this.routerPath('find'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.instanceNameSchema,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.webhookController.findWebhook(instance),
            });
            res.status(index_router_1.HttpStatus.OK).json(response);
        }));
    }
}
exports.WebhookRouter = WebhookRouter;
