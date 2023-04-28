import { AuthenticationState } from '@codechat/base';
export declare function useMultiFileAuthStateRedisDb(redisUri: string, instanceName: string): Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}>;
