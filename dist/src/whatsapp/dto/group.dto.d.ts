export declare class CreateGroupDto {
    subject: string;
    description?: string;
    participants: string[];
}
export declare class GroupPictureDto {
    groupJid: string;
    image: string;
}
export declare class GroupJid {
    groupJid: string;
}
export declare class GroupUpdateParticipantDto extends GroupJid {
    action: 'add' | 'remove' | 'promote' | 'demote';
    participants: string[];
}
