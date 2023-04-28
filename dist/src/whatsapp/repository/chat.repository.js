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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = exports.ChatQuery = void 0;
const path_1 = require("path");
const abstract_repository_1 = require("../abstract/abstract.repository");
const fs_1 = require("fs");
class ChatQuery {
}
exports.ChatQuery = ChatQuery;
class ChatRepository extends abstract_repository_1.Repository {
    constructor(chatModel, configService) {
        super(configService);
        this.chatModel = chatModel;
        this.configService = configService;
    }
    insert(data, saveDb = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.length === 0) {
                return;
            }
            try {
                if (this.dbSettings.ENABLED && saveDb) {
                    const insert = yield this.chatModel.insertMany([...data]);
                    return { insertCount: insert.length };
                }
                data.forEach((chat) => {
                    this.writeStore({
                        path: (0, path_1.join)(this.storePath, 'chats', chat.owner),
                        fileName: chat.id,
                        data: chat,
                    });
                });
                return { insertCount: data.length };
            }
            catch (error) {
                return error;
            }
            finally {
                data = undefined;
            }
        });
    }
    find(query) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dbSettings.ENABLED) {
                    return yield this.chatModel.find({ owner: query.where.owner });
                }
                const chats = [];
                const openDir = (0, fs_1.opendirSync)((0, path_1.join)(this.storePath, 'chats', query.where.owner));
                try {
                    for (var _d = true, openDir_1 = __asyncValues(openDir), openDir_1_1; openDir_1_1 = yield openDir_1.next(), _a = openDir_1_1.done, !_a;) {
                        _c = openDir_1_1.value;
                        _d = false;
                        try {
                            const dirent = _c;
                            if (dirent.isFile()) {
                                chats.push(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.storePath, 'chats', query.where.owner, dirent.name), { encoding: 'utf-8' })));
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = openDir_1.return)) yield _b.call(openDir_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return chats;
            }
            catch (error) {
                return [];
            }
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dbSettings.ENABLED) {
                    return yield this.chatModel.deleteOne(Object.assign({}, query.where));
                }
                (0, fs_1.rmSync)((0, path_1.join)(this.storePath, 'chats', query.where.owner, query.where.id + '.josn'), {
                    force: true,
                    recursive: true,
                });
                return { deleted: { chatId: query.where.id } };
            }
            catch (error) {
                return { error: error === null || error === void 0 ? void 0 : error.toString() };
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
