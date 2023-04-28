"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = exports.router = void 0;
const express_1 = require("express");
const env_config_1 = require("../../config/env.config");
const instance_guard_1 = require("../guards/instance.guard");
const auth_guard_1 = require("../guards/auth.guard");
const chat_router_1 = require("./chat.router");
const group_router_1 = require("./group.router");
const instance_router_1 = require("./instance.router");
const sendMessage_router_1 = require("./sendMessage.router");
const view_router_1 = require("./view.router");
const webhook_router_1 = require("./webhook.router");
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
exports.HttpStatus = HttpStatus;
const router = (0, express_1.Router)();
exports.router = router;
const authType = env_config_1.configService.get('AUTHENTICATION').TYPE;
const guards = [instance_guard_1.instanceExistsGuard, instance_guard_1.instanceLoggedGuard, auth_guard_1.authGuard[authType]];
router
    .use('/instance', new instance_router_1.InstanceRouter(env_config_1.configService, ...guards).router, new view_router_1.ViewsRouter(instance_guard_1.instanceExistsGuard).router)
    .use('/message', new sendMessage_router_1.MessageRouter(...guards).router)
    .use('/chat', new chat_router_1.ChatRouter(...guards).router)
    .use('/group', new group_router_1.GroupRouter(...guards).router)
    .use('/webhook', new webhook_router_1.WebhookRouter(...guards).router);
