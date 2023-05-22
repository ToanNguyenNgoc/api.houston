import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthHeaderService } from '../../auth-header/auth-header.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'x-api-key') {
  constructor(
    private readonly authHeaderService: AuthHeaderService
  ) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
      if (this.authHeaderService.validateApiKey(apiKey)) {
        done(null, true)
      }
      done(new UnauthorizedException('x-api-key is invalid'), null)
    })
  }
}