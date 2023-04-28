"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryBroker = void 0;
class RepositoryBroker {
    constructor(message, chat, contact, messageUpdate, webhook, auth, dbServer) {
        this.message = message;
        this.chat = chat;
        this.contact = contact;
        this.messageUpdate = messageUpdate;
        this.webhook = webhook;
        this.auth = auth;
        this.dbClient = dbServer;
    }
    get dbServer() {
        return this.dbClient;
    }
}
exports.RepositoryBroker = RepositoryBroker;
