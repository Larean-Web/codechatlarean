"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsRouter = void 0;
const express_1 = require("express");
const abstract_router_1 = require("../abstract/abstract.router");
const whatsapp_module_1 = require("../whatsapp.module");
class ViewsRouter extends abstract_router_1.RouterBroker {
    constructor(...guards) {
        super();
        this.router = (0, express_1.Router)();
        this.router.get(this.routerPath('qrcode'), ...guards, (req, res) => {
            return whatsapp_module_1.viewsController.qrcode(req, res);
        });
    }
}
exports.ViewsRouter = ViewsRouter;
