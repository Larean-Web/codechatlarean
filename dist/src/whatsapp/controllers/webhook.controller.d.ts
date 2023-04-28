import { InstanceDto } from '../dto/instance.dto';
import { WebhookDto } from '../dto/webhook.dto';
import { WebhookService } from '../services/webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    createWebhook(instance: InstanceDto, data: WebhookDto): Promise<{
        webhook: {
            webhook: WebhookDto;
            instanceName: string;
        };
    }>;
    findWebhook(instance: InstanceDto): Promise<WebhookDto>;
}
