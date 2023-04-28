"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.ChatRaw = void 0;
const mongoose_1 = require("mongoose");
const db_connect_1 = require("../../db/db.connect");
class ChatRaw {
}
exports.ChatRaw = ChatRaw;
const chatSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    id: { type: String, required: true, minlength: 1 },
    owner: { type: String, required: true, minlength: 1 },
});
exports.ChatModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(ChatRaw.name, chatSchema, 'chats');
