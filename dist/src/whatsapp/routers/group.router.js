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
exports.GroupRouter = void 0;
const express_1 = require("express");
const validate_schema_1 = require("../../validate/validate.schema");
const abstract_router_1 = require("../abstract/abstract.router");
const group_dto_1 = require("../dto/group.dto");
const whatsapp_module_1 = require("../whatsapp.module");
const index_router_1 = require("./index.router");
class GroupRouter extends abstract_router_1.RouterBroker {
    constructor(...guards) {
        super();
        this.router = (0, express_1.Router)();
        this.router
            .post(this.routerPath('create'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.dataValidate({
                request: req,
                schema: validate_schema_1.createGroupSchema,
                ClassRef: group_dto_1.CreateGroupDto,
                execute: (instance, data) => whatsapp_module_1.groupController.createGroup(instance, data),
            });
            res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .put(this.routerPath('updateGroupPicture'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.updateGroupPicture,
                ClassRef: group_dto_1.GroupPictureDto,
                execute: (instance, data) => whatsapp_module_1.groupController.updateGroupPicture(instance, data),
            });
            res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .get(this.routerPath('findGroupInfos'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.groupJidSchema,
                ClassRef: group_dto_1.GroupJid,
                execute: (instance, data) => whatsapp_module_1.groupController.findGroupInfo(instance, data),
            });
            res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .get(this.routerPath('participants'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.groupJidSchema,
                ClassRef: group_dto_1.GroupJid,
                execute: (instance, data) => whatsapp_module_1.groupController.findParticipants(instance, data),
            });
            res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .get(this.routerPath('inviteCode'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.groupJidSchema,
                ClassRef: group_dto_1.GroupJid,
                execute: (instance, data) => whatsapp_module_1.groupController.inviteCode(instance, data),
            });
            res.status(index_router_1.HttpStatus.OK).json(response);
        }))
            .put(this.routerPath('revokeInviteCode'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.groupJidSchema,
                ClassRef: group_dto_1.GroupJid,
                execute: (instance, data) => whatsapp_module_1.groupController.revokeInviteCode(instance, data),
            });
            res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .put(this.routerPath('updateParticipant'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: validate_schema_1.updateParticipantsSchema,
                ClassRef: group_dto_1.GroupUpdateParticipantDto,
                execute: (instance, data) => whatsapp_module_1.groupController.updateGParticipate(instance, data),
            });
            res.status(index_router_1.HttpStatus.CREATED).json(response);
        }))
            .delete(this.routerPath('leaveGroup'), ...guards, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.groupValidate({
                request: req,
                schema: {},
                ClassRef: group_dto_1.GroupJid,
                execute: (instance, data) => whatsapp_module_1.groupController.leaveGroup(instance, data),
            });
            res.status(index_router_1.HttpStatus.OK).json(response);
        }));
    }
}
exports.GroupRouter = GroupRouter;
