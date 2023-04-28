import { IInsert, Repository } from '../abstract/abstract.repository';
import { ConfigService } from '../../config/env.config';
import { IWebhookModel, WebhookRaw } from '../models';
export declare class WebhookRepository extends Repository {
    private readonly webhookModel;
    private readonly configService;
    constructor(webhookModel: IWebhookModel, configService: ConfigService);
    create(data: WebhookRaw, instance: string): Promise<IInsert>;
    find(instance: string): Promise<WebhookRaw>;
}
