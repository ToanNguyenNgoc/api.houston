/*
https://docs.nestjs.com/guards#guards
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities';
import { Repository } from 'typeorm';
import { encode } from '../../utils';
import { key } from '../../common';

@Injectable()
export class BookingGuard implements CanActivate {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRe: Repository<Booking>,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
    const codes = user.roles?.map(role => role.code)
    if (codes?.includes(encode(key.SUPER_ADMIN))) {
      return true
    }
    const bookingUpdate = await this.bookingRe.createQueryBuilder('tb_booking')
      .where({ id: params.id, deleted: false })
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .getOne()
    if (!bookingUpdate) throw new NotFoundException('Cannot found !')
    if (user.branch?.id !== bookingUpdate.branch?.id) {
      throw new ForbiddenException('You only update booking your branch !')
    }
    return true;
  }
}
