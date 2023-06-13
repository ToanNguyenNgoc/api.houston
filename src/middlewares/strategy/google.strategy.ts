import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { name } from "src/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/api/customer/entities";
import { Repository } from "typeorm";
import { generatePassword } from "src/utils";
import { SendMailService } from "src/services";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, name.GOOGLE_OAUTH_2) {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRep: Repository<Customer>,
    private readonly sendmailService: SendMailService
  ) {
    super({
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL,
      scope: ['profile', 'email']
    })
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const customer = await this.customerRep
      .createQueryBuilder('tb_customer')
      .where({ email: profile._json.email })
      .getOne()
    if (customer) {
      return customer
    } else {
      const newCustomer = new Customer()
      newCustomer.fullname = profile.displayName
      newCustomer.password = await generatePassword(profile.id)
      newCustomer.email = profile._json.email
      newCustomer.email_transfer = profile._json.email
      newCustomer.social_id = `G${profile.id}`
      newCustomer.social_platform = "GOOGLE"
      newCustomer.social_avatar = profile.photos ? profile.photos[0]?.value : null
      const customerCreated = await this.customerRep.save(newCustomer)
      await this.sendmailService.onSendMail({
        template: 'welcome',
        to: profile._json.email,
        context: {
          data: {
            fullname: profile.displayName,
          }
        }
      })
      return customerCreated
    }
  }
}