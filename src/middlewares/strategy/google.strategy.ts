import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { name } from "src/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/api/customer/entities";
import { Repository } from "typeorm";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, name.GOOGLE_OAUTH_2) {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRep:Repository<Customer>
  ) {
    super({
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL,
      scope: ['profile', 'email']
    })
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(profile)
    // console.log(profile.emails[0])
    return profile
  }
}