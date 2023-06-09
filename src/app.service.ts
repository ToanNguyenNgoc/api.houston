import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encode } from './utils'
import * as moment from 'moment'
import { Role } from 'src/api/role/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }
  async getHello() {
    await this.initial()
    // return `Web Api Houston's services ${moment().format('YYYY/MM/DD-HH')}`;
    const time = moment().format('HH:mm [ngày] DD, [tháng] MM, YYYY')
    const clientHost = process.env.CLIENT_HOST
    const serverHost = process.env.SERVER_HOST
    const mail = process.env.MAILER_ORIGINAL
    return {time, clientHost, serverHost, mail}
  }
  async initial() {
    const count = await this.roleRepository.count()
    const initRole = new Role()
    initRole.title = 'Super Admin'
    initRole.code = encode('Super Admin')
    if (count === 0) {
      await this.roleRepository.save(initRole)
    }
  }
}
