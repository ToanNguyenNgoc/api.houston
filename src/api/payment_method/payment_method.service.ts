import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from "./entities"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { transformResponse } from 'src/common';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRep: Repository<PaymentMethod>
  ) { }
  async create(body: CreatePaymentMethodDto) {
    try {
      const qb = this.paymentMethodRep
        .createQueryBuilder('tb_payment_method')
        .insert()
        .into(PaymentMethod)
        .values([
          { name: 'Thanh toán bằng tiền mặt', name_key: 'CASH', name_children_key: 'CASH' },
          { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua ứng dụng hỗ trợ VNPAYQR', name_children_key: 'VNPAYQR' },
          { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua ATM-Tài khoản ngân hàng nội địa', name_children_key: 'VNBANK' },
          { name: 'Thanh toán qua VNPAY', name_key: 'VNPAY', name_children: 'Thanh toán qua thẻ quốc tế', name_children_key: 'INTCARD' },
        ])
      const response = await qb.execute()
      return { data: response }
    } catch (error) {
      return { message: 'Create success' }
    }
  }

  async findAll() {
    try {
      const qb = this.paymentMethodRep
        .createQueryBuilder('tb_payment_method')
        .where({ deleted: false })
        .orderBy('tb_payment_method.created_at', 'DESC')
        .skip((15 * 1) - 15)
        .limit(15)
      const [response, total] = await qb.getManyAndCount()
      return transformResponse(response, total, 1, 15)
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: string) {
    const qb = this.paymentMethodRep
      .createQueryBuilder('tb_payment_method')
      .where({ id: id, deleted: false })
    const response = await qb.getOne()
    if (!response) throw new NotFoundException('Cannot found')
    return { data: response }
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return `This action updates a #${id} paymentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethod`;
  }
}
