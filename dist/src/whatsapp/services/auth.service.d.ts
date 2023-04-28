import { ConfigService } from '../../config/env.config';
import { InstanceDto } from '../dto/instance.dto';
import { WAMonitoringService } from './monitor.service';
import { RepositoryBroker } from '../repository/repository.manager';
export type JwtPayload = {
    instanceName: string;
    apiName: string;
    jwt?: string;
    apikey?: string;
    tokenId: string;
};
export declare class OldToken {
    oldToken: string;
}
export declare class AuthService {
    private readonly configService;
    private readonly waMonitor;
    private readonly repository;
    constructor(configService: ConfigService, waMonitor: WAMonitoringService, repository: RepositoryBroker);
    private readonly logger;
    private jwt;
    private apikey;
    generateHash(instance: InstanceDto): Promise<{
        jwt: string;
    } | {
        apikey: string;
    }>;
    refreshToken({ oldToken }: OldToken): Promise<{
        jwt: string;
        instanceName: string;
    }>;
}
