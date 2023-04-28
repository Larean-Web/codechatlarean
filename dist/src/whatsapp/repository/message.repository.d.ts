import { ConfigService } from '../../config/env.config';
import { IMessageModel, MessageRaw } from '../models';
import { IInsert, Repository } from '../abstract/abstract.repository';
export declare class MessageQuery {
    where: MessageRaw;
    limit?: number;
}
export declare class MessageRepository extends Repository {
    private readonly messageModel;
    private readonly configService;
    constructor(messageModel: IMessageModel, configService: ConfigService);
    insert(data: MessageRaw[], saveDb?: boolean): Promise<IInsert>;
    find(query: MessageQuery): Promise<MessageRaw[]>;
}
