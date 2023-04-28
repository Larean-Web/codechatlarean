"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookSchema = exports.updateGroupPicture = exports.updateParticipantsSchema = exports.groupJidSchema = exports.createGroupSchema = exports.messageUpSchema = exports.messageValidateSchema = exports.profilePictureSchema = exports.contactValidateSchema = exports.deleteMessageSchema = exports.archiveChatSchema = exports.readMessageSchema = exports.whatsappNumberSchema = exports.reactionMessageSchema = exports.contactMessageSchema = exports.listMessageSchema = exports.locationMessageSchema = exports.buttonMessageSchema = exports.audioMessageSchema = exports.mediaMessageSchema = exports.textMessageSchema = exports.oldTokenSchema = exports.instanceNameSchema = void 0;
const uuid_1 = require("uuid");
const isNotEmpty = (...propertyNames) => {
    const properties = {};
    propertyNames.forEach((property) => (properties[property] = {
        minLength: 1,
        description: `The "${property}" cannot be empty`,
    }));
    return {
        if: {
            propertyNames: {
                enum: [...propertyNames],
            },
        },
        then: { properties },
    };
};
exports.instanceNameSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        instanceName: { type: 'string' },
    } }, isNotEmpty('instanceName'));
exports.oldTokenSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        oldToken: { type: 'string' },
    }, required: ['oldToken'] }, isNotEmpty('oldToken'));
const optionsSchema = {
    properties: {
        delay: {
            type: 'integer',
            description: 'Enter a value in milliseconds',
        },
        presence: {
            type: 'string',
            enum: ['unavailable', 'available', 'composing', 'recording', 'paused'],
        },
    },
};
const numberDefinition = {
    type: 'string',
    pattern: '^\\d+[\\.@\\w-]+',
    description: 'Invalid format',
};
exports.textMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        textMessage: Object.assign({ type: 'object', properties: {
                text: { type: 'string' },
            }, required: ['text'] }, isNotEmpty('text')),
    },
    required: ['textMessage', 'number'],
};
exports.mediaMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        mediaMessage: Object.assign({ type: 'object', properties: {
                mediatype: { type: 'string', enum: ['image', 'document', 'video', 'audio'] },
                media: { type: 'string' },
                fileName: { type: 'string' },
                caption: { type: 'string' },
            }, required: ['mediatype', 'media'] }, isNotEmpty('fileName', 'caption', 'media')),
    },
    required: ['mediaMessage', 'number'],
};
exports.audioMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        audioMessage: Object.assign({ type: 'object', properties: {
                audio: { type: 'string' },
            }, required: ['audio'] }, isNotEmpty('audio')),
    },
    required: ['audioMessage', 'number'],
};
exports.buttonMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        buttonMessage: Object.assign({ type: 'object', properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                footerText: { type: 'string' },
                buttons: {
                    type: 'array',
                    minItems: 1,
                    uniqueItems: true,
                    items: Object.assign({ type: 'object', properties: {
                            buttonText: { type: 'string' },
                            buttonId: { type: 'string' },
                        }, required: ['buttonText', 'buttonId'] }, isNotEmpty('buttonText', 'buttonId')),
                },
                mediaMessage: Object.assign({ type: 'object', properties: {
                        media: { type: 'string' },
                        fileName: { type: 'string' },
                        mediatype: { type: 'string', enum: ['image', 'document', 'video'] },
                    }, required: ['media', 'mediatype'] }, isNotEmpty('media', 'fileName')),
            }, required: ['title', 'buttons'] }, isNotEmpty('title', 'description')),
    },
    required: ['number', 'buttonMessage'],
};
exports.locationMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        locationMessage: Object.assign({ type: 'object', properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                name: { type: 'string' },
                address: { type: 'string' },
            }, required: ['latitude', 'longitude'] }, isNotEmpty('name', 'addresss')),
    },
    required: ['number', 'locationMessage'],
};
exports.listMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        listMessage: Object.assign({ type: 'object', properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                footerText: { type: 'string' },
                buttonText: { type: 'string' },
                sections: {
                    type: 'array',
                    minItems: 1,
                    uniqueItems: true,
                    items: Object.assign({ type: 'object', properties: {
                            title: { type: 'string' },
                            rows: {
                                type: 'array',
                                minItems: 1,
                                uniqueItems: true,
                                items: Object.assign({ type: 'object', properties: {
                                        title: { type: 'string' },
                                        description: { type: 'string' },
                                        rowId: { type: 'string' },
                                    }, required: ['title', 'description', 'rowId'] }, isNotEmpty('title', 'description', 'rowId')),
                            },
                        }, required: ['title', 'rows'] }, isNotEmpty('title')),
                },
            }, required: ['title', 'description', 'buttonText', 'sections'] }, isNotEmpty('title', 'description', 'buttonText', 'footerText')),
    },
    required: ['number', 'listMessage'],
};
exports.contactMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        number: Object.assign({}, numberDefinition),
        options: Object.assign({}, optionsSchema),
        contactMessage: {
            type: 'array',
            items: Object.assign({ type: 'object', properties: {
                    fullName: { type: 'string' },
                    wuid: {
                        type: 'string',
                        minLength: 10,
                        pattern: '\\d+',
                        description: '"wuid" must be a numeric string',
                    },
                    phoneNumber: { type: 'string', minLength: 10 },
                }, required: ['fullName', 'wuid', 'phoneNumber'] }, isNotEmpty('fullName')),
            minItems: 1,
            uniqueItems: true,
        },
    },
    required: ['number', 'contactMessage'],
};
exports.reactionMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        reactionMessage: Object.assign({ type: 'object', properties: {
                key: Object.assign({ type: 'object', properties: {
                        id: { type: 'string' },
                        remoteJid: { type: 'string' },
                        fromMe: { type: 'boolean', enum: [true, false] },
                    }, required: ['id', 'remoteJid', 'fromMe'] }, isNotEmpty('id', 'remoteJid')),
                reaction: { type: 'string' },
            }, required: ['key', 'reaction'] }, isNotEmpty('reaction')),
    },
    required: ['reactionMessage'],
};
exports.whatsappNumberSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        numbers: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                type: 'string',
                pattern: '^\\d+',
                description: '"numbers" must be an array of numeric strings',
            },
        },
    },
};
exports.readMessageSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        readMessages: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: Object.assign({ properties: {
                    id: { type: 'string' },
                    fromMe: { type: 'boolean', enum: [true, false] },
                    remoteJid: { type: 'string' },
                }, required: ['id', 'fromMe', 'remoteJid'] }, isNotEmpty('id', 'remoteJid')),
        },
    },
    required: ['readMessages'],
};
exports.archiveChatSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        lastMessage: Object.assign({ type: 'object', properties: {
                key: Object.assign({ type: 'object', properties: {
                        id: { type: 'string' },
                        remoteJid: { type: 'string' },
                        fromMe: { type: 'boolean', enum: [true, false] },
                    }, required: ['id', 'fromMe', 'remoteJid'] }, isNotEmpty('id', 'remoteJid')),
                messageTimestamp: { type: 'integer', minLength: 1 },
            }, required: ['key'] }, isNotEmpty('messageTimestamp')),
        archive: { type: 'boolean', enum: [true, false] },
    },
    required: ['lastMessage', 'archive'],
};
exports.deleteMessageSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        id: { type: 'string' },
        fromMe: { type: 'boolean', enum: [true, false] },
        remoteJid: { type: 'string' },
        participant: { type: 'string' },
    }, required: ['id', 'fromMe', 'remoteJid'] }, isNotEmpty('id', 'remoteJid', 'participant'));
exports.contactValidateSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        where: Object.assign({ type: 'object', properties: {
                _id: { type: 'string', minLength: 1 },
                pushName: { type: 'string', minLength: 1 },
                id: { type: 'string', minLength: 1 },
            } }, isNotEmpty('_id', 'id', 'pushName')),
    },
};
exports.profilePictureSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        number: { type: 'string' },
    } }, isNotEmpty('number'));
exports.messageValidateSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        where: Object.assign({ type: 'object', properties: {
                _id: { type: 'string', minLength: 1 },
                key: {
                    type: 'object',
                    if: {
                        propertyNames: {
                            enum: ['fromMe', 'remoteJid', 'id'],
                        },
                    },
                    then: {
                        properties: {
                            remoteJid: {
                                type: 'string',
                                minLength: 1,
                                description: 'The property cannot be empty',
                            },
                            id: {
                                type: 'string',
                                minLength: 1,
                                description: 'The property cannot be empty',
                            },
                            fromMe: { type: 'boolean', enum: [true, false] },
                        },
                    },
                },
                message: { type: 'object' },
            } }, isNotEmpty('_id')),
        limit: { type: 'integer' },
    },
};
exports.messageUpSchema = {
    $id: (0, uuid_1.v4)(),
    type: 'object',
    properties: {
        where: Object.assign({ type: 'object', properties: {
                _id: { type: 'string' },
                remoteJid: { type: 'string' },
                id: { type: 'string' },
                fromMe: { type: 'boolean', enum: [true, false] },
                participant: { type: 'string' },
                status: {
                    type: 'string',
                    enum: ['ERROR', 'PENDING', 'SERVER_ACK', 'DELIVERY_ACK', 'READ', 'PLAYED'],
                },
            } }, isNotEmpty('_id', 'remoteJid', 'id', 'status')),
        limit: { type: 'integer' },
    },
};
exports.createGroupSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        subject: { type: 'string' },
        description: { type: 'string' },
        profilePicture: { type: 'string' },
        participants: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                type: 'string',
                minLength: 10,
                pattern: '\\d+',
                description: '"participants" must be an array of numeric strings',
            },
        },
    }, required: ['subject', 'participants'] }, isNotEmpty('subject', 'description', 'profilePicture'));
exports.groupJidSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        groupJid: { type: 'string', pattern: '^[\\d]+@g.us$' },
    }, required: ['groupJid'] }, isNotEmpty('groupJid'));
exports.updateParticipantsSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        groupJid: { type: 'string' },
        action: {
            type: 'string',
            enum: ['add', 'remove', 'promote', 'demote'],
        },
        participants: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                type: 'string',
                minLength: 10,
                pattern: '\\d+',
                description: '"participants" must be an array of numeric strings',
            },
        },
    }, required: ['groupJid', 'action', 'participants'] }, isNotEmpty('groupJid', 'action'));
exports.updateGroupPicture = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        groupJid: { type: 'string' },
        image: { type: 'string' },
    }, required: ['groupJid', 'image'] }, isNotEmpty('groupJid', 'image'));
exports.webhookSchema = Object.assign({ $id: (0, uuid_1.v4)(), type: 'object', properties: {
        url: { type: 'string' },
        enabled: { type: 'boolean', enum: [true, false] },
    }, required: ['url', 'enabled'] }, isNotEmpty('url'));
