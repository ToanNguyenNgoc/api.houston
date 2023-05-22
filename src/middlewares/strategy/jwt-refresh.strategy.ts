import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from "express";
import { Promise } from 'bluebird'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { name } from "../../common";
import { Account } from "src/api/account/entities";
import { Customer } from "src/api/customer/entities";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, name.JWT_REFRESH) {
  constructor(
    @InjectRepository(Account)
    private readonly account: Repository<Account>,
    @InjectRepository(Customer)
    private readonly customer: Repository<Customer>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: '141',
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refresh_token) {
      return req.cookies.refresh_token;
    }
    return null;
  }

  async validate(payload: any) {
    if (payload.type === 'AUTHENTICATE') {
      const res = await this.account
        .createQueryBuilder('tb_account')
        .leftJoinAndSelect('tb_account.roles', 'tb_role')
        .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
        .leftJoinAndSelect('tb_account.branch', 'tb_branch')
        .where({ id: payload.id, email: payload.email })
        .getOne()
      const account = {
        ...res,
        type: payload.type,
        roles: await Promise.filter(res?.roles ?? [], async (role) => (
          role.status === true && role.deleted === false
        ))
      }
      return account
    }
    if (payload.type === "CUSTOMER") {
      // const res = await this.customer
      //   .createQueryBuilder('tb_customer')
      //   .where({ id: payload.id, email: payload.email })
      //   .getOne()
      return payload
    }
  }
}