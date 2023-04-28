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
exports.ContactRepository = exports.ContactQuery = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const abstract_repository_1 = require("../abstract/abstract.repository");
class ContactQuery {
}
exports.ContactQuery = ContactQuery;
class ContactRepository extends abstract_repository_1.Repository {
    constructor(contactModel, configService) {
        super(configService);
        this.contactModel = contactModel;
        this.configService = configService;
    }
    insert(data, saveDb = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.length === 0) {
                return;
            }
            try {
                if (this.dbSettings.ENABLED && saveDb) {
                    const insert = yield this.contactModel.insertMany([...data]);
                    return { insertCount: insert.length };
                }
                data.forEach((contact) => {
                    this.writeStore({
                        path: (0, path_1.join)(this.storePath, 'contacts', contact.owner),
                        fileName: contact.id,
                        data: contact,
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
        var _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dbSettings.ENABLED) {
                    return yield this.contactModel.find(Object.assign({}, query.where));
                }
                const contacts = [];
                if ((_d = query === null || query === void 0 ? void 0 : query.where) === null || _d === void 0 ? void 0 : _d.id) {
                    contacts.push(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.storePath, 'contacts', query.where.owner, query.where.id + '.json'), { encoding: 'utf-8' })));
                }
                else {
                    const openDir = (0, fs_1.opendirSync)((0, path_1.join)(this.storePath, 'contacts', query.where.owner), {
                        encoding: 'utf-8',
                    });
                    try {
                        for (var _e = true, openDir_1 = __asyncValues(openDir), openDir_1_1; openDir_1_1 = yield openDir_1.next(), _a = openDir_1_1.done, !_a;) {
                            _c = openDir_1_1.value;
                            _e = false;
                            try {
                                const dirent = _c;
                                if (dirent.isFile()) {
                                    contacts.push(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(this.storePath, 'contacts', query.where.owner, dirent.name), { encoding: 'utf-8' })));
                                }
                            }
                            finally {
                                _e = true;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_e && !_a && (_b = openDir_1.return)) yield _b.call(openDir_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                return contacts;
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.ContactRepository = ContactRepository;
