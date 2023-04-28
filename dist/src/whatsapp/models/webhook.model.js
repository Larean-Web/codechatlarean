"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookModel = exports.WebhookRaw = void 0;
const mongoose_1 = require("mongoose");
const db_connect_1 = require("../../db/db.connect");
class WebhookRaw {
}
exports.WebhookRaw = WebhookRaw;
const webhookSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    url: { type: String, required: true },
    enabled: { type: Boolean, required: true },
});
exports.WebhookModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(WebhookRaw.name, webhookSchema, 'webhook');
