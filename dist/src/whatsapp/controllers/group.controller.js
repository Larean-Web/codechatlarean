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
exports.GroupController = void 0;
class GroupController {
    constructor(waMonitor) {
        this.waMonitor = waMonitor;
    }
    createGroup(instance, create) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].createGroup(create);
        });
    }
    updateGroupPicture(instance, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].updateGroupPicture(update);
        });
    }
    findGroupInfo(instance, groupJid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].findGroup(groupJid);
        });
    }
    inviteCode(instance, groupJid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].inviteCode(groupJid);
        });
    }
    revokeInviteCode(instance, groupJid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].revokeInviteCode(groupJid);
        });
    }
    findParticipants(instance, groupJid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].findParticipants(groupJid);
        });
    }
    updateGParticipate(instance, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].updateGParticipant(update);
        });
    }
    leaveGroup(instance, groupJid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instance.instanceName].leaveGroup(groupJid);
        });
    }
}
exports.GroupController = GroupController;
