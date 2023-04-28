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
exports.ViewsController = void 0;
const exceptions_1 = require("../../exceptions");
const index_router_1 = require("../routers/index.router");
class ViewsController {
    constructor(waMonit, configService) {
        this.waMonit = waMonit;
        this.configService = configService;
    }
    qrcode(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const param = request.params;
                const instance = this.waMonit.waInstances[param.instanceName];
                if (instance.connectionStatus.state === 'open') {
                    throw new exceptions_1.BadRequestException('The instance is already connected');
                }
                const type = this.configService.get('AUTHENTICATION').TYPE;
                return response.status(index_router_1.HttpStatus.OK).render('qrcode', Object.assign({ type }, param));
            }
            catch (error) {
                console.log('ERROR: ', error);
            }
        });
    }
}
exports.ViewsController = ViewsController;
