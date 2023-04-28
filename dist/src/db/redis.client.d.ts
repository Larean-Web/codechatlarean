export declare class RedisCache {
    private instanceName;
    constructor(uri: string, instanceName: string);
    private readonly logger;
    private client;
    getKeys(): Promise<string[]>;
    writeData(field: string, data: any): Promise<number>;
    readData(field: string): Promise<any>;
    removeData(field: string): Promise<number>;
    delAll(hash?: string): Promise<number>;
}
