"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.AuthRaw = void 0;
const mongoose_1 = require("mongoose");
const db_connect_1 = require("../../db/db.connect");
class AuthRaw {
}
exports.AuthRaw = AuthRaw;
const authSchema = new mongoose_1.Schema({
    _id: { type: String, _id: true },
    jwt: { type: String, minlength: 1 },
    apikey: { type: String, minlength: 1 },
});
exports.AuthModel = db_connect_1.dbserver === null || db_connect_1.dbserver === void 0 ? void 0 : db_connect_1.dbserver.model(AuthRaw.name, authSchema, 'authentication');
