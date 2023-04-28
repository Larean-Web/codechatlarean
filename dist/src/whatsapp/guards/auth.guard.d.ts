import { NextFunction, Request, Response } from 'express';
declare function jwtGuard(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function apikey(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare const authGuard: {
    jwt: typeof jwtGuard;
    apikey: typeof apikey;
};
export {};
