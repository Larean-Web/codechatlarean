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
exports.ChatController = void 0;
class ChatController {
    constructor(waMonitor) {
        this.waMonitor = waMonitor;
    }
    whatsappNumber({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].whatsappNumber(data);
        });
    }
    readMessage({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].markMessageAsRead(data);
        });
    }
    archiveChat({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].archiveChat(data);
        });
    }
    deleteMessage({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].deleteMessage(data);
        });
    }
    fetchProfilePicture({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].profilePicture(data.number);
        });
    }
    fetchContacts({ instanceName }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].fetchContacts(query);
        });
    }
    getBase64FromMediaMessage({ instanceName }, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].getBase64FromMediaMessage(message);
        });
    }
    fetchMessages({ instanceName }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].fetchMessages(query);
        });
    }
    fetchStatusMessage({ instanceName }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].fetchStatusMessage(query);
        });
    }
    fetchChats({ instanceName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].fetchChats();
        });
    }
}
exports.ChatController = ChatController;
