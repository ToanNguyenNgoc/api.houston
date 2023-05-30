import { PassportSerializer } from '@nestjs/passport';
export declare class SessionSerializer extends PassportSerializer {
    constructor();
    serializeUser(user: any, done: Function): void;
    deserializeUser(payload: any, done: Function): Promise<void>;
}
