import { RequestHandler } from 'express';
import { RouterBroker } from '../abstract/abstract.router';
export declare class GroupRouter extends RouterBroker {
    constructor(...guards: RequestHandler[]);
    readonly router: import("express-serve-static-core").Router;
}
