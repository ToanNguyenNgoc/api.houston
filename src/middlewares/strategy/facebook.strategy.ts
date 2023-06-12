import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { Injectable } from "@nestjs/common";
import { name } from "src/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/api/customer/entities";
import { Repository } from "typeorm";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, name.FACEBOOK_AUTH) {
  constructor() {
    super({
      clientID: process.env.FB_AUTH_CLIENT_ID,
      clientSecret: process.env.FB_AUTH_SECRET,
      callbackURL: process.env.FB_AUTH_CALLBACK_URL,
      profileFields: ['id', 'email', 'displayName', 'photos']
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    // console.log('profile', profile)
    // const { name, emails } = profile;
    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    // };
    // const payload = {
    //   user,
    //   accessToken,
    // };
    // done(null, payload);
    return profile
  }
}