import { ConfigService } from '../../config/env.config';
import { ContactRaw, IContactModel } from '../models';
import { IInsert, Repository } from '../abstract/abstract.repository';
export declare class ContactQuery {
    where: ContactRaw;
}
export declare class ContactRepository extends Repository {
    private readonly contactModel;
    private readonly configService;
    constructor(contactModel: IContactModel, configService: ConfigService);
    insert(data: ContactRaw[], saveDb?: boolean): Promise<IInsert>;
    find(query: ContactQuery): Promise<ContactRaw[]>;
}
