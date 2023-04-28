/// <reference types="node" />
/// <reference types="node" />
import { Express } from 'express';
import * as https from 'https';
import * as http from 'http';
export declare class ServerUP {
    #private;
    static set app(e: Express);
    static https(): https.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    static http(): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}
