import { RequestHandler } from 'express';
import { RouterBroker } from '../abstract/abstract.router';
import { ConfigService } from '../../config/env.config';
export declare class InstanceRouter extends RouterBroker {
    readonly configService: ConfigService;
    constructor(configService: ConfigService, ...guards: RequestHandler[]);
    readonly router: import("express-serve-static-core").Router;
}
