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
exports.SendMessageController = void 0;
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../../exceptions");
class SendMessageController {
    constructor(waMonitor) {
        this.waMonitor = waMonitor;
    }
    sendText({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].textMessage(data);
        });
    }
    sendMedia({ instanceName }, data) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, class_validator_1.isBase64)((_a = data === null || data === void 0 ? void 0 : data.mediaMessage) === null || _a === void 0 ? void 0 : _a.media) && !((_b = data === null || data === void 0 ? void 0 : data.mediaMessage) === null || _b === void 0 ? void 0 : _b.fileName)) {
                throw new exceptions_1.BadRequestException('For bse64 the file name must be informed.');
            }
            if ((0, class_validator_1.isURL)((_c = data === null || data === void 0 ? void 0 : data.mediaMessage) === null || _c === void 0 ? void 0 : _c.media) || (0, class_validator_1.isBase64)((_d = data === null || data === void 0 ? void 0 : data.mediaMessage) === null || _d === void 0 ? void 0 : _d.media)) {
                return yield this.waMonitor.waInstances[instanceName].mediaMessage(data);
            }
            throw new exceptions_1.BadRequestException('Owned media must be a url or base64');
        });
    }
    sendWhatsAppAudio({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, class_validator_1.isURL)(data.audioMessage.audio) || (0, class_validator_1.isBase64)(data.audioMessage.audio)) {
                return yield this.waMonitor.waInstances[instanceName].audioWhatsapp(data);
            }
            throw new exceptions_1.BadRequestException('Owned media must be a url or base64');
        });
    }
    sendButtons({ instanceName }, data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, class_validator_1.isBase64)((_a = data.buttonMessage.mediaMessage) === null || _a === void 0 ? void 0 : _a.media) &&
                !((_b = data.buttonMessage.mediaMessage) === null || _b === void 0 ? void 0 : _b.fileName)) {
                throw new exceptions_1.BadRequestException('For bse64 the file name must be informed.');
            }
            return yield this.waMonitor.waInstances[instanceName].buttonMessage(data);
        });
    }
    sendLocation({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].locationMessage(data);
        });
    }
    sendList({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].listMessage(data);
        });
    }
    sendContact({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.waMonitor.waInstances[instanceName].contactMessage(data);
        });
    }
    sendReaction({ instanceName }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.reactionMessage.reaction.match(/[^\(\)\w\sà-ú"-\+]+/)) {
                throw new exceptions_1.BadRequestException('"reaction" must be an emoji');
            }
            return yield this.waMonitor.waInstances[instanceName].reactionMessage(data);
        });
    }
}
exports.SendMessageController = SendMessageController;
