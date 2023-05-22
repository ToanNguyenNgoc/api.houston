import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from "express";
import { Promise } from 'bluebird'
// import { aesDecode } from "~/utils";
import { InjectRepository } from "@nestjs/typeorm";
// import { Account } from "~/system/account/entities";
import { Repository } from "typeorm";
import { aesDecode } from "../../utils";
// import { Customer } from "~/system/customer/entities";
// import { name } from "~/common";
import { name } from "../../common";
import { Account } from "src/api/account/entities";
import { Customer } from "src/api/customer/entities";

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, name.JWT_COOKIE) {
  constructor(
    @InjectRepository(Account)
    private readonly account: Repository<Account>,
    @InjectRepository(Customer)
    private readonly customer: Repository<Customer>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtCookieStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: '141',
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    const aesDe = aesDecode(payload.code)
    const obj = JSON.parse(aesDe)
    if (obj.type === 'AUTHENTICATE') {
      const res = await this.account
        .createQueryBuilder('tb_account')
        .leftJoinAndSelect('tb_account.roles', 'tb_role')
        .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
        .leftJoinAndSelect('tb_account.branch', 'tb_branch')
        .where({ id: obj.id, email: obj.email })
        .getOne()
      const account = {
        ...res,
        type: obj.type,
        roles: await Promise.filter(res?.roles ?? [], async (role) => (
          role.status === true && role.deleted === false
        ))
      }
      return account
    }
    if (obj.type === "CUSTOMER") {
      // const res = await this.customer
      //   .createQueryBuilder('tb_customer')
      //   .where({ id: payload.id, email: payload.email })
      //   .getOne()
      return obj
    }
    // return true
  }
}