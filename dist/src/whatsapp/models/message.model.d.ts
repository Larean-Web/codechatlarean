/// <reference types="long" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
import { wa } from '../types/wa.types';
declare class Key {
    id?: string;
    remoteJid?: string;
    fromMe?: boolean;
    participant?: string;
}
export declare class MessageRaw {
    _id?: string;
    key?: Key;
    pushName?: string;
    participant?: string;
    message?: object;
    messageTimestamp?: number | Long.Long;
    owner: string;
    source?: 'android' | 'web' | 'ios';
}
export declare const MessageModel: import("mongoose").Model<MessageRaw, {}, {}, {}, Schema<MessageRaw, import("mongoose").Model<MessageRaw, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MessageRaw>>;
export type IMessageModel = typeof MessageModel;
export declare class MessageUpdateRaw {
    _id?: string;
    remoteJid?: string;
    id?: string;
    fromMe?: boolean;
    participant?: string;
    datetime?: number;
    status?: wa.StatusMessage;
    owner: string;
}
export declare const MessageUpModel: import("mongoose").Model<MessageUpdateRaw, {}, {}, {}, Schema<MessageUpdateRaw, import("mongoose").Model<MessageUpdateRaw, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MessageUpdateRaw>>;
export type IMessageUpModel = typeof MessageUpModel;
export {};
