import { Request, Response } from 'express';
import { ConfigService } from '../../config/env.config';
import { WAMonitoringService } from '../services/monitor.service';
export declare class ViewsController {
    private readonly waMonit;
    private readonly configService;
    constructor(waMonit: WAMonitoringService, configService: ConfigService);
    qrcode(request: Request, response: Response): Promise<void>;
}
