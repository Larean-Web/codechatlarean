import { proto, WAPresence } from '@codechat/base';
export declare class Options {
    delay?: number;
    presence?: WAPresence;
}
declare class OptionsMessage {
    options: Options;
}
export declare class Metadata extends OptionsMessage {
    number: string;
}
declare class TextMessage {
    text: string;
}
export declare class SendTextDto extends Metadata {
    textMessage: TextMessage;
}
export type MediaType = 'image' | 'document' | 'video' | 'audio';
export declare class MediaMessage {
    mediatype: MediaType;
    caption?: string;
    fileName?: string;
    media: string;
}
export declare class SendMediaDto extends Metadata {
    mediaMessage: MediaMessage;
}
declare class Audio {
    audio: string;
}
export declare class SendAudioDto extends Metadata {
    audioMessage: Audio;
}
declare class Button {
    buttonText: string;
    buttonId: string;
}
declare class ButtonMessage {
    title: string;
    description: string;
    footerText?: string;
    buttons: Button[];
    mediaMessage?: MediaMessage;
}
export declare class SendButtonDto extends Metadata {
    buttonMessage: ButtonMessage;
}
declare class LocationMessage {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
}
export declare class SendLocationDto extends Metadata {
    locationMessage: LocationMessage;
}
declare class Row {
    title: string;
    description: string;
    rowId: string;
}
declare class Section {
    title: string;
    rows: Row[];
}
declare class ListMessage {
    title: string;
    description: string;
    footerText?: string;
    buttonText: string;
    sections: Section[];
}
export declare class SendListDto extends Metadata {
    listMessage: ListMessage;
}
export declare class ContactMessage {
    fullName: string;
    wuid: string;
    phoneNumber: string;
}
export declare class SendContactDto extends Metadata {
    contactMessage: ContactMessage[];
}
declare class ReactionMessage {
    key: proto.IMessageKey;
    reaction: string;
}
export declare class SendReactionDto {
    reactionMessage: ReactionMessage;
}
export {};
