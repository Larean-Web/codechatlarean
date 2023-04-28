import { ConfigService } from '../../config/env.config';
import { IInsert, Repository } from '../abstract/abstract.repository';
import { ChatRaw, IChatModel } from '../models';
export declare class ChatQuery {
    where: ChatRaw;
}
export declare class ChatRepository extends Repository {
    private readonly chatModel;
    private readonly configService;
    constructor(chatModel: IChatModel, configService: ConfigService);
    insert(data: ChatRaw[], saveDb?: boolean): Promise<IInsert>;
    find(query: ChatQuery): Promise<ChatRaw[]>;
    delete(query: ChatQuery): Promise<import("mongodb").DeleteResult | {
        deleted: {
            chatId: string;
        };
        error?: undefined;
    } | {
        error: any;
        deleted?: undefined;
    }>;
}
