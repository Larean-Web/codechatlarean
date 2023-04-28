export declare class Logger {
    private context;
    private readonly configService;
    constructor(context?: string);
    setContext(value: string): void;
    private console;
    log(value: any): void;
    info(value: any): void;
    warn(value: any): void;
    error(value: any): void;
    verbose(value: any): void;
    debug(value: any): void;
    dark(value: any): void;
}
