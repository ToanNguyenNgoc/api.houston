import { Profile, Strategy } from "passport-google-oauth20";
import { Customer } from "src/api/customer/entities";
import { Repository } from "typeorm";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly customerRep;
    constructor(customerRep: Repository<Customer>);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<Profile>;
}
export {};
