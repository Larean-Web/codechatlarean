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
exports.ChatRouter = void 0;
const express_1 = require("express");
const validate_schema_1 = require("../../validate/validate.schema");
const chat_dto_1 = require("../dto/chat.dto");
const contact_repository_1 = require("../repository/contact.repository");
const message_repository_1 = require("../repository/message.repository");
const whatsapp_module_1 = require("../whatsapp.module");
const abstract_router_1 = require("../abstract/abstract.router");
const index_router_1 = require("./index.router");
const messageUp_repository_1 = require("../repository/messageUp.repository");
const instance_dto_1 = require("../dto/instance.dto");
class ChatRouter extends abstract_router_1.RouterBroker {
    constructor(...guards) {
        super();
        this.router = (0, express_1.Router)();
        this.router
            .post(this.routerPath('whatsappNumbers'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.whatsappNumberSchema,
                ClassRef: chat_dto_1.WhatsAppNumberDto,
                execute: (instance, data) => whatsapp_module_1.chatController.whatsappNumber(instance, data),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .put(this.routerPath('markMessageAsRead'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.readMessageSchema,
                ClassRef: chat_dto_1.ReadMessageDto,
                execute: (instance, data) => whatsapp_module_1.chatController.readMessage(instance, data),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .put(this.routerPath('archiveChat'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.archiveChatSchema,
                ClassRef: chat_dto_1.ArchiveChatDto,
                execute: (instance, data) => whatsapp_module_1.chatController.archiveChat(instance, data),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .delete(this.routerPath('deleteMessageForEveryone'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.deleteMessageSchema,
                ClassRef: chat_dto_1.DeleteMessage,
                execute: (instance, data) => whatsapp_module_1.chatController.deleteMessage(instance, data),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .post(this.routerPath('fetchProfilePictureUrl'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.profilePictureSchema,
                ClassRef: chat_dto_1.NumberDto,
                execute: (instance, data) => whatsapp_module_1.chatController.fetchProfilePicture(instance, data),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .post(this.routerPath('findContacts'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.contactValidateSchema,
                ClassRef: contact_repository_1.ContactQuery,
                execute: (instance, data) => whatsapp_module_1.chatController.fetchContacts(instance, data),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .post(this.routerPath('getBase64FromMediaMessage'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: null,
                ClassRef: Object,
                execute: (instance, data) => whatsapp_module_1.chatController.getBase64FromMediaMessage(instance, data),
            });
            return res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .post(this.routerPath('findMessages'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.messageValidateSchema,
                ClassRef: message_repository_1.MessageQuery,
                execute: (instance, data) => whatsapp_module_1.chatController.fetchMessages(instance, data),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .post(this.routerPath('findStatusMessage'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.messageUpSchema,
                ClassRef: messageUp_repository_1.MessageUpQuery,
                execute: (instance, data) => whatsapp_module_1.chatController.fetchStatusMessage(instance, data),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .get(this.routerPath('findChats'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: null,
                ClassRef: instance_dto_1.InstanceDto,
                execute: (instance) => whatsapp_module_1.chatController.fetchChats(instance),
            });
            return res.status(index_router_1.HttpStatus.OK).json(response);
        }));
    }
}
exports.ChatRouter = ChatRouter;
