import { AuthenticationState } from '@codechat/base';
export declare function useMultiFileAuthStateDb(coll: string): Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
}>;
