import { Repository } from "typeorm";
import { Account } from "src/api/account/entities";
import { Customer } from "src/api/customer/entities";
declare const JwtSysStrategy_base: new (...args: any[]) => any;
export declare class JwtSysStrategy extends JwtSysStrategy_base {
    private readonly account;
    private readonly customer;
    constructor(account: Repository<Account>, customer: Repository<Customer>);
    validate(payload: any): Promise<any>;
}
export {};
