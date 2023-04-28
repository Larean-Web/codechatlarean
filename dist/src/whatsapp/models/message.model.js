"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUpModel = exports.MessageUpdateRaw = exports.MessageModel = exports.MessageRaw = void 0;
const mongoose_1 = require("mongoose");
const db_connect_1 = require("../../db/db.connect");
class Key {
}
class MessageRaw {
}
exports.MessageRaw = MessageRaw;
const messageSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    key: {
        id: { type: String, required: true, minlength: 1 },
        remoteJid: { type: String, required: true, minlength: 1 },
        fromMe: { type: Boolean, required: true },
        participant: { type: String, minlength: 1 },
    },
    pushName: { type: String },
    participant: { type: String },
    message: { type: Object },
    source: { type: String, minlength: 3, enum: ['android', 'web', 'ios'] },
    messageTimestamp: { type: Number, required: true },
    owner: { type: String, required: true, minlength: 1 },
});
exports.MessageModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(MessageRaw.name, messageSchema, 'messages');
class MessageUpdateRaw {
}
exports.MessageUpdateRaw = MessageUpdateRaw;
const messageUpdateSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    remoteJid: { type: String, required: true, min: 1 },
    id: { type: String, required: true, min: 1 },
    fromMe: { type: Boolean, required: true },
    participant: { type: String, min: 1 },
    datetime: { type: Number, required: true, min: 1 },
    status: { type: String, required: true },
    owner: { type: String, required: true, min: 1 },
});
exports.MessageUpModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(MessageUpdateRaw.name, messageUpdateSchema, 'messageUpdate');
