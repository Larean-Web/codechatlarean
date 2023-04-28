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
import { GroupMetadata, proto, WASocket } from '@codechat/base';
import { ConfigService } from '../../config/env.config';
import { wa } from '../types/wa.types';
import EventEmitter2 from 'eventemitter2';
import { RepositoryBroker } from '../repository/repository.manager';
import { MessageRaw, MessageUpdateRaw } from '../models/message.model';
import { ContactRaw } from '../models/contact.model';
import { ChatRaw } from '../models/chat.model';
import { SendAudioDto, SendButtonDto, SendContactDto, SendListDto, SendLocationDto, SendMediaDto, SendReactionDto, SendTextDto } from '../dto/sendMessage.dto';
import { ArchiveChatDto, DeleteMessage, OnWhatsAppDto, ReadMessageDto, WhatsAppNumberDto } from '../dto/chat.dto';
import { MessageQuery } from '../repository/message.repository';
import { ContactQuery } from '../repository/contact.repository';
import { CreateGroupDto, GroupJid, GroupPictureDto, GroupUpdateParticipantDto } from '../dto/group.dto';
import { MessageUpQuery } from '../repository/messageUp.repository';
import { WebhookRaw } from '../models/webhook.model';
export declare class WAStartupService {
    private readonly configService;
    private readonly eventEmitter;
    private readonly repository;
    constructor(configService: ConfigService, eventEmitter: EventEmitter2, repository: RepositoryBroker);
    private readonly logger;
    private readonly instance;
    client: WASocket;
    private readonly localWebhook;
    private stateConnection;
    private readonly storePath;
    private readonly msgRetryCounterCache;
    private readonly userDevicesCache;
    private endSession;
    set instanceName(name: string);
    get instanceName(): string;
    s: any;
    get wuid(): string;
    getProfileName(): Promise<string>;
    get profilePictureUrl(): string;
    get qrCode(): wa.QrCode;
    private loadWebhook;
    setWebhook(data: WebhookRaw): Promise<void>;
    findWebhook(): Promise<WebhookRaw>;
    private sendDataWebhook;
    private connectionUpdate;
    private getMessage;
    private cleanStore;
    private defineAuthState;
    connectToWhatsapp(): Promise<WASocket>;
    private readonly chatHandle;
    private readonly contactHandle;
    private readonly messageHandle;
    private readonly groupHandler;
    private eventHandler;
    private createJid;
    private formatBRNumber;
    profilePicture(number: string): Promise<{
        wuid: string;
        profilePictureUrl: string;
    }>;
    private sendMessageWithTyping;
    get connectionStatus(): wa.StateConnection;
    textMessage(data: SendTextDto): Promise<proto.WebMessageInfo>;
    private prepareMediaMessage;
    mediaMessage(data: SendMediaDto): Promise<proto.WebMessageInfo>;
    audioWhatsapp(data: SendAudioDto): Promise<proto.WebMessageInfo>;
    buttonMessage(data: SendButtonDto): Promise<proto.WebMessageInfo>;
    locationMessage(data: SendLocationDto): Promise<proto.WebMessageInfo>;
    listMessage(data: SendListDto): Promise<proto.WebMessageInfo>;
    contactMessage(data: SendContactDto): Promise<proto.WebMessageInfo>;
    reactionMessage(data: SendReactionDto): Promise<proto.WebMessageInfo>;
    whatsappNumber(data: WhatsAppNumberDto): Promise<OnWhatsAppDto[]>;
    markMessageAsRead(data: ReadMessageDto): Promise<{
        message: string;
        read: string;
    }>;
    archiveChat(data: ArchiveChatDto): Promise<{
        chatId: string;
        archived: boolean;
    }>;
    deleteMessage(del: DeleteMessage): Promise<proto.WebMessageInfo>;
    getBase64FromMediaMessage(m: proto.IWebMessageInfo): Promise<{
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
    fetchContacts(query: ContactQuery): Promise<ContactRaw[]>;
    fetchMessages(query: MessageQuery): Promise<MessageRaw[]>;
    fetchStatusMessage(query: MessageUpQuery): Promise<MessageUpdateRaw[] | (import("mongoose").Document<unknown, any, MessageUpdateRaw> & Omit<MessageUpdateRaw & Required<{
        _id: string;
    }>, never>)[]>;
    fetchChats(): Promise<ChatRaw[]>;
    createGroup(create: CreateGroupDto): Promise<{
        groupMetadata: GroupMetadata;
    }>;
    updateGroupPicture(picture: GroupPictureDto): Promise<{
        update: string;
    }>;
    findGroup(id: GroupJid, reply?: 'inner' | 'out'): Promise<GroupMetadata>;
    inviteCode(id: GroupJid): Promise<{
        inviteUrl: string;
        inviteCode: string;
    }>;
    revokeInviteCode(id: GroupJid): Promise<{
        revoked: boolean;
        inviteCode: string;
    }>;
    findParticipants(id: GroupJid): Promise<{
        participants: import("@codechat/base").GroupParticipant[];
    }>;
    updateGParticipant(update: GroupUpdateParticipantDto): Promise<{
        updateParticipants: {
            status: string;
            jid: string;
        }[];
    }>;
    leaveGroup(id: GroupJid): Promise<{
        groupJid: string;
        leave: boolean;
    }>;
}
