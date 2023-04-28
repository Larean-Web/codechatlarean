"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSubtype = exports.TypeMediaMessage = exports.Events = void 0;
var Events;
(function (Events) {
    Events["QRCODE_UPDATED"] = "qrcode.updated";
    Events["CONNECTION_UPDATE"] = "connection.update";
    Events["STATUS_INSTANCE"] = "status.instance";
    Events["MESSAGES_SET"] = "messages.set";
    Events["MESSAGES_UPSERT"] = "messages.upsert";
    Events["MESSAGES_UPDATE"] = "messages.update";
    Events["SEND_MESSAGE"] = "send.message";
    Events["CONTACTS_SET"] = "contacts.set";
    Events["CONTACTS_UPSERT"] = "contacts.upsert";
    Events["CONTACTS_UPDATE"] = "contacts.update";
    Events["PRESENCE_UPDATE"] = "presence.update";
    Events["CHATS_SET"] = "chats.set";
    Events["CHATS_UPDATE"] = "chats.update";
    Events["CHATS_UPSERT"] = "chats.upsert";
    Events["CHATS_DELETE"] = "chats.delete";
    Events["GROUPS_UPSERT"] = "groups.upsert";
    Events["GROUPS_UPDATE"] = "groups.update";
    Events["GROUP_PARTICIPANTS_UPDATE"] = "group-participants.update";
})(Events = exports.Events || (exports.Events = {}));
exports.TypeMediaMessage = [
    'imageMessage',
    'documentMessage',
    'audioMessage',
    'videoMessage',
    'stickerMessage',
];
exports.MessageSubtype = [
    'ephemeralMessage',
    'documentWithCaptionMessage',
    'viewOnceMessage',
    'viewOnceMessageV2',
];
