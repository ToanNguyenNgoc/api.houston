import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from "typeorm";
import { name } from "../../common";
import { Promise } from 'bluebird'
import { aesDecode } from "../../utils";
import { Account } from "src/api/account/entities";
import { Customer } from "src/api/customer/entities";

@Injectable()
export class JwtSysStrategy extends PassportStrategy(Strategy, name.JWT) {
  constructor(
    @InjectRepository(Account)
    private readonly account: Repository<Account>,
    @InjectRepository(Customer)
    private readonly customer: Repository<Customer>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '141'
    });
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
        type:obj.type,
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
  }
}