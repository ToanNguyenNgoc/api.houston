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
      clientID: '433603162729-lmpo28268ebcs22baqiqnelp74a83qea.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3003/customers/auth/google/redirect',
      // callbackURL: 'https://houstongarden.click',
      scope: ['profile', 'email']
    })
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(profile)
    // console.log(profile.emails[0])
    return profile
  }
}