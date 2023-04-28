"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendReactionDto = exports.SendContactDto = exports.ContactMessage = exports.SendListDto = exports.SendLocationDto = exports.SendButtonDto = exports.SendAudioDto = exports.SendMediaDto = exports.MediaMessage = exports.SendTextDto = exports.Metadata = exports.Options = void 0;
class Options {
}
exports.Options = Options;
class OptionsMessage {
}
class Metadata extends OptionsMessage {
}
exports.Metadata = Metadata;
class TextMessage {
}
class SendTextDto extends Metadata {
}
exports.SendTextDto = SendTextDto;
class MediaMessage {
}
exports.MediaMessage = MediaMessage;
class SendMediaDto extends Metadata {
}
exports.SendMediaDto = SendMediaDto;
class Audio {
}
class SendAudioDto extends Metadata {
}
exports.SendAudioDto = SendAudioDto;
class Button {
}
class ButtonMessage {
}
class SendButtonDto extends Metadata {
}
exports.SendButtonDto = SendButtonDto;
class LocationMessage {
}
class SendLocationDto extends Metadata {
}
exports.SendLocationDto = SendLocationDto;
class Row {
}
class Section {
}
class ListMessage {
}
class SendListDto extends Metadata {
}
exports.SendListDto = SendListDto;
class ContactMessage {
}
exports.ContactMessage = ContactMessage;
class SendContactDto extends Metadata {
}
exports.SendContactDto = SendContactDto;
class ReactionMessage {
}
class SendReactionDto {
}
exports.SendReactionDto = SendReactionDto;
