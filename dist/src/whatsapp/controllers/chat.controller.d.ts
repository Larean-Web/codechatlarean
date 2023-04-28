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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { proto } from '@codechat/base';
import { ArchiveChatDto, DeleteMessage, NumberDto, ReadMessageDto, WhatsAppNumberDto } from '../dto/chat.dto';
import { InstanceDto } from '../dto/instance.dto';
import { ContactQuery } from '../repository/contact.repository';
import { MessageQuery } from '../repository/message.repository';
import { MessageUpQuery } from '../repository/messageUp.repository';
import { WAMonitoringService } from '../services/monitor.service';
export declare class ChatController {
    private readonly waMonitor;
    constructor(waMonitor: WAMonitoringService);
    whatsappNumber({ instanceName }: InstanceDto, data: WhatsAppNumberDto): Promise<import("../dto/chat.dto").OnWhatsAppDto[]>;
    readMessage({ instanceName }: InstanceDto, data: ReadMessageDto): Promise<{
        message: string;
        read: string;
    }>;
    archiveChat({ instanceName }: InstanceDto, data: ArchiveChatDto): Promise<{
        chatId: string;
        archived: boolean;
    }>;
    deleteMessage({ instanceName }: InstanceDto, data: DeleteMessage): Promise<proto.WebMessageInfo>;
    fetchProfilePicture({ instanceName }: InstanceDto, data: NumberDto): Promise<{
        wuid: string;
        profilePictureUrl: string;
    }>;
    fetchContacts({ instanceName }: InstanceDto, query: ContactQuery): Promise<import("../models").ContactRaw[]>;
    getBase64FromMediaMessage({ instanceName }: InstanceDto, message: proto.IWebMessageInfo): Promise<{
        mediaType: string;
        fileName: any;
        caption: any;
        size: {
            fileLength: any;
            height: any;
            width: any;
        };
        mimetype: any;
        base64: string;
    }>;
    fetchMessages({ instanceName }: InstanceDto, query: MessageQuery): Promise<import("../models").MessageRaw[]>;
    fetchStatusMessage({ instanceName }: InstanceDto, query: MessageUpQuery): Promise<import("../models").MessageUpdateRaw[] | (import("mongoose").Document<unknown, any, import("../models").MessageUpdateRaw> & Omit<import("../models").MessageUpdateRaw & Required<{
        _id: string;
    }>, never>)[]>;
    fetchChats({ instanceName }: InstanceDto): Promise<import("../models").ChatRaw[]>;
}
