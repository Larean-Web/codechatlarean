import { AuthenticationState, WAConnectionState } from '@codechat/base';
export declare enum Events {
    QRCODE_UPDATED = "qrcode.updated",
    CONNECTION_UPDATE = "connection.update",
    STATUS_INSTANCE = "status.instance",
    MESSAGES_SET = "messages.set",
    MESSAGES_UPSERT = "messages.upsert",
    MESSAGES_UPDATE = "messages.update",
    SEND_MESSAGE = "send.message",
    CONTACTS_SET = "contacts.set",
    CONTACTS_UPSERT = "contacts.upsert",
    CONTACTS_UPDATE = "contacts.update",
    PRESENCE_UPDATE = "presence.update",
    CHATS_SET = "chats.set",
    CHATS_UPDATE = "chats.update",
    CHATS_UPSERT = "chats.upsert",
    CHATS_DELETE = "chats.delete",
    GROUPS_UPSERT = "groups.upsert",
    GROUPS_UPDATE = "groups.update",
    GROUP_PARTICIPANTS_UPDATE = "group-participants.update"
}
export declare namespace wa {
    type QrCode = {
        count?: number;
        base64?: string;
        code?: string;
    };
    type Instance = {
        qrcode?: QrCode;
        authState?: {
            state: AuthenticationState;
            saveCreds: () => void;
        };
        name?: string;
        wuid?: string;
        profileName?: string;
        profilePictureUrl?: string;
    };
    type LocalWebHook = {
        enabled?: boolean;
        url?: string;
    };
    type StateConnection = {
        instance?: string;
        state?: WAConnectionState | 'refused';
        statusReason?: number;
    };
    type StatusMessage = 'ERROR' | 'PENDING' | 'SERVER_ACK' | 'DELIVERY_ACK' | 'READ' | 'PLAYED';
}
export declare const TypeMediaMessage: string[];
export declare const MessageSubtype: string[];
