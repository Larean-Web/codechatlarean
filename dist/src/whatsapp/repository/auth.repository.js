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
exports.AuthRepository = void 0;
const path_1 = require("path");
const abstract_repository_1 = require("../abstract/abstract.repository");
const fs_1 = require("fs");
const path_config_1 = require("../../config/path.config");
class AuthRepository extends abstract_repository_1.Repository {
    constructor(authModel, configService) {
        super(configService);
        this.authModel = authModel;
        this.configService = configService;
        this.auth = configService.get('AUTHENTICATION');
    }
    create(data, instance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dbSettings.ENABLED) {
                    const insert = yield this.authModel.replaceOne({ _id: instance }, Object.assign({}, data), { upsert: true });
                    return { insertCount: insert.modifiedCount };
                }
                this.writeStore({
                    path: (0, path_1.join)(path_config_1.AUTH_DIR, this.auth.TYPE),
                    fileName: instance,
                    data,
                });
                return { insertCount: 1 };
            }
            catch (error) {
                return { error };
            }
        });
    }
    find(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dbSettings.ENABLED) {
                    return yield this.authModel.findOne({ _id: instance });
                }
                return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(path_config_1.AUTH_DIR, this.auth.TYPE, instance + '.json'), {
                    encoding: 'utf-8',
                }));
            }
            catch (error) {
                return {};
            }
        });
    }
}
exports.AuthRepository = AuthRepository;
