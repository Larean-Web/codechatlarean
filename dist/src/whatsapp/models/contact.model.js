"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = exports.ContactRaw = void 0;
const mongoose_1 = require("mongoose");
const db_connect_1 = require("../../db/db.connect");
class ContactRaw {
}
exports.ContactRaw = ContactRaw;
const contactSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    pushName: { type: String, minlength: 1 },
    id: { type: String, required: true, minlength: 1 },
    profilePictureUrl: { type: String, minlength: 1 },
    owner: { type: String, required: true, minlength: 1 },
});
exports.ContactModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(ContactRaw.name, contactSchema, 'contacts');
