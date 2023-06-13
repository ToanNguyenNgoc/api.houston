import { Profile, Strategy } from "passport-google-oauth20";
import { Customer } from "src/api/customer/entities";
import { Repository } from "typeorm";
import { SendMailService } from "src/services";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly customerRep;
    private readonly sendmailService;
    constructor(customerRep: Repository<Customer>, sendmailService: SendMailService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<Customer>;
}
export {};
