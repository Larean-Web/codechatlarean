"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMessage = exports.ArchiveChatDto = exports.ReadMessageDto = exports.NumberDto = exports.WhatsAppNumberDto = exports.OnWhatsAppDto = void 0;
class OnWhatsAppDto {
    constructor(jid, exists, name) {
        this.jid = jid;
        this.exists = exists;
        this.name = name;
    }
}
exports.OnWhatsAppDto = OnWhatsAppDto;
class WhatsAppNumberDto {
}
exports.WhatsAppNumberDto = WhatsAppNumberDto;
class NumberDto {
}
exports.NumberDto = NumberDto;
class Key {
}
class ReadMessageDto {
}
exports.ReadMessageDto = ReadMessageDto;
class LastMessage {
}
class ArchiveChatDto {
}
exports.ArchiveChatDto = ArchiveChatDto;
class DeleteMessage {
}
exports.DeleteMessage = DeleteMessage;
