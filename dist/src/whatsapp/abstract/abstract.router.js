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
exports.RouterBroker = void 0;
const jsonschema_1 = require("jsonschema");
const exceptions_1 = require("../../exceptions");
require("express-async-errors");
const logger_config_1 = require("../../config/logger.config");
const logger = new logger_config_1.Logger('Validate');
class RouterBroker {
    constructor() { }
    routerPath(path, param = true) {
        let route = '/' + path;
        param ? (route += '/:instanceName') : null;
        return route;
    }
    dataValidate(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, schema, ClassRef, execute } = args;
            const ref = new ClassRef();
            const body = request.body;
            const instance = request.params;
            if ((request === null || request === void 0 ? void 0 : request.query) && Object.keys(request.query).length > 0) {
                Object.assign(instance, request.query);
            }
            if (request.originalUrl.includes('/instance/create')) {
                Object.assign(instance, body);
            }
            Object.assign(ref, body);
            const v = schema ? (0, jsonschema_1.validate)(ref, schema) : { valid: true, errors: [] };
            if (!v.valid) {
                const message = v.errors.map(({ property, stack, schema }) => {
                    let message;
                    if (schema['description']) {
                        message = schema['description'];
                    }
                    else {
                        message = stack.replace('instance.', '');
                    }
                    return {
                        property: property.replace('instance.', ''),
                        message,
                    };
                });
                logger.error([...message]);
                throw new exceptions_1.BadRequestException(...message);
            }
            return yield execute(instance, ref);
        });
    }
    groupValidate(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, ClassRef, schema, execute } = args;
            const groupJid = request.query;
            if (!(groupJid === null || groupJid === void 0 ? void 0 : groupJid.groupJid)) {
                throw new exceptions_1.BadRequestException('The group id needs to be informed in the query', 'ex: "groupJid=120362@g.us"');
            }
            const instance = request.params;
            const body = request.body;
            const ref = new ClassRef();
            Object.assign(body, groupJid);
            Object.assign(ref, body);
            const v = (0, jsonschema_1.validate)(ref, schema);
            if (!v.valid) {
                const message = v.errors.map(({ property, stack, schema }) => {
                    let message;
                    if (schema['description']) {
                        message = schema['description'];
                    }
                    else {
                        message = stack.replace('instance.', '');
                    }
                    return {
                        property: property.replace('instance.', ''),
                        message,
                    };
                });
                logger.error([...message]);
                throw new exceptions_1.BadRequestException(...message);
            }
            return yield execute(instance, ref);
        });
    }
}
exports.RouterBroker = RouterBroker;
