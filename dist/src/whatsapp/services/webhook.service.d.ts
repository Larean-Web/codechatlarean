import { InstanceDto } from '../dto/instance.dto';
import { WebhookDto } from '../dto/webhook.dto';
import { WAMonitoringService } from './monitor.service';
export declare class WebhookService {
    private readonly waMonitor;
    constructor(waMonitor: WAMonitoringService);
    create(instance: InstanceDto, data: WebhookDto): {
        webhook: {
            webhook: WebhookDto;
            instanceName: string;
        };
    };
    find(instance: InstanceDto): Promise<WebhookDto>;
}
