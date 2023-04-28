import { InstanceDto } from '../dto/instance.dto';
import { JSONSchema7 } from 'json-schema';
import { Request } from 'express';
import 'express-async-errors';
type DataValidate<T> = {
    request: Request;
    schema: JSONSchema7;
    ClassRef: any;
    execute: (instance: InstanceDto, data: T) => Promise<any>;
};
export declare abstract class RouterBroker {
    constructor();
    routerPath(path: string, param?: boolean): string;
    dataValidate<T>(args: DataValidate<T>): Promise<any>;
    groupValidate<T>(args: DataValidate<T>): Promise<any>;
}
export {};
