import { Repository } from "typeorm";
import { Account } from "src/api/account/entities";
import { Customer } from "src/api/customer/entities";
declare const JwtCookieStrategy_base: new (...args: any[]) => any;
export declare class JwtCookieStrategy extends JwtCookieStrategy_base {
    private readonly account;
    private readonly customer;
    constructor(account: Repository<Account>, customer: Repository<Customer>);
    private static extractJWTFromCookie;
    validate(payload: any): Promise<any>;
}
export {};
