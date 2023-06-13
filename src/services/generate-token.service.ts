import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as moment from "moment";
import { aesEncode } from "src/utils";
import { Request } from "express"

@Injectable()
export class GenerateToken {
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  async generateToken(
    id: number,
    email: string,
  ): Promise<any> {
    const code = JSON.stringify({ id: id, email: email, type: 'CUSTOMER' })
    const token = await this.jwtService.signAsync({ code: aesEncode(code) }, {
      expiresIn: '2m',
      secret: process.env.JWT_KEY
    })
    const currentTime = new Date()
    const newTime = currentTime.getTime() + (60 * 1000 * 2) + (60 * 1000 * 60 * parseInt(process.env.TIME_ZONE_UTC))
    const token_expired_at = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
    return { token, token_expired_at }
  }
  async generateRefreshToken(req: Request, id: number, email: string): Promise<string> {
    const date = new Date()
    const refresh_token = await this.jwtService.signAsync({
      id: id,
      email: email,
      eTime: date.getTime(),
      type: 'CUSTOMER'
    }, {
      expiresIn: '15 days',
      secret: process.env.JWT_KEY
    })
    return refresh_token
  }
}