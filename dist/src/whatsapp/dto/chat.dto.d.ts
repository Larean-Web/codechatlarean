export declare class OnWhatsAppDto {
    readonly jid: string;
    readonly exists: boolean;
    readonly name?: string;
    constructor(jid: string, exists: boolean, name?: string);
}
export declare class WhatsAppNumberDto {
    numbers: string[];
}
export declare class NumberDto {
    number: string;
}
declare class Key {
    id: string;
    fromMe: boolean;
    remoteJid: string;
}
export declare class ReadMessageDto {
    readMessages: Key[];
}
declare class LastMessage {
    key: Key;
    messageTimestamp?: number;
}
export declare class ArchiveChatDto {
    lastMessage: LastMessage;
    archive: boolean;
}
export declare class DeleteMessage {
    id: string;
    fromMe: boolean;
    remoteJid: string;
    participant?: string;
}
export {};
