import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookingCustomerDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../branches/entities';
import { Brackets, Repository } from 'typeorm';
import { Villa } from '../villa/entities';
import { Customer } from '../customer/entities';
import { Account } from '../account/entities';
import { Booking } from './entities';
import { QueryBooking, QueryBookingCustomer } from './dto';
import * as moment from 'moment'
import { SendMailService, VnpayService } from '../../services';
import { RequestHeader } from '../../interface';
import { formatPrice, isSPAdmin, rangeDate } from '../../utils';
import { payKey, transformResponse } from '../../common';
import { PaymentMethod } from 'src/api/payment_method/entities';
import { PaymentGateway } from 'src/api/payment_gateway/entities';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRe: Repository<Branch>,

    @InjectRepository(Villa)
    private readonly villaRe: Repository<Villa>,

    @InjectRepository(Customer)
    private readonly customerRe: Repository<Customer>,

    @InjectRepository(Account)
    private readonly accountRe: Repository<Account>,

    @InjectRepository(Booking)
    private readonly bookingRe: Repository<Booking>,

    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRe: Repository<PaymentMethod>,

    @InjectRepository(PaymentGateway)
    private readonly paymentGatewayRe: Repository<PaymentGateway>,

    private readonly sendMail: SendMailService,
    private readonly vnpayService: VnpayService

  ) { }
  async create(req: RequestHeader<Account>, body: CreateBookingDto) {
    try {
      const user = req.user
      const nights = rangeDate(body.from_date_booking, body.to_date_booking)
      //[branch]:if account is super admin enable choose branch
      if (nights < 0) throw new BadRequestException('Date to is invalid')
      const account = req.user
      const branch = await this.branchRe.createQueryBuilder('tb_branch')
        .where({ id: isSPAdmin(user) ? body.branch_id : user.branch?.id, deleted: false }).getOne()
      if (!branch) throw new NotFoundException('Cannot found branch')
      const villa = await this.villaRe.createQueryBuilder('tb_villa')
        .where({ id: body.villa_id, deleted: false }).getOne()
      if (!villa) throw new NotFoundException('Cannot found villa')
      const customer = await this.customerRe.createQueryBuilder('tb_customer')
        .where({ id: body.customer_id, deleted: false }).getOne()
      if (!customer) throw new NotFoundException('Cannot found customer')
      const payment_method = await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
        .where({ name_key: payKey.CASH }).getOne()
      if (!payment_method) throw new NotFoundException('Cannot found payment method')
      const booking = new Booking()
      booking.branch = branch
      booking.villa = villa
      booking.customer = customer
      booking.employee = account
      booking.from_date_booking = body.from_date_booking
      booking.to_date_booking = body.to_date_booking
      booking.nights = nights
      booking.customer_count = body.customer_count
      booking.baby_count = body.baby_count ?? 0
      booking.note = body.note
      booking.amount = nights * villa.special_price
      booking.payment_method = payment_method
      const response = await this.bookingRe.save(booking)
      delete response.customer.password
      delete response.employee.password

      return { data: response };
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(req: RequestHeader<Account>, query: QueryBooking) {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const _isSPAdmin = isSPAdmin(req.user)
    const joins = query.includes?.trim()?.split('|') ?? []
    const qb = this.bookingRe.createQueryBuilder('tb_booking')
      .where({ deleted: false })
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
      .leftJoin('tb_booking.customer', 'tb_customer')
      .addSelect(['tb_customer.id', 'tb_customer.email', 'tb_customer.fullname', 'tb_customer.telephone'])
    if (query.status_booking) {
      qb.andWhere(
        new Brackets((qb) => qb.where(
          'tb_booking.status_booking =:status_booking',
          { status_booking: query.status_booking })
        )
      )
    }
    if (!_isSPAdmin) {
      qb.andWhere(
        new Brackets((qb) => qb.where(
          'tb_branch.id =:id',
          { id: req.user.branch.id }
        ))
      )
    }
    if (_isSPAdmin && query.branch_id) {
      qb.andWhere(
        new Brackets((qb) => qb.where(
          'tb_branch.id =:id',
          { id: query.branch_id }
        ))
      )
    }
    if (query.booking_platform) {
      qb.andWhere(
        new Brackets((qb) => qb.where(
          'tb_booking.booking_platform =:booking_platform',
          { booking_platform: query.booking_platform })
        )
      )
    }
    if (query.filter_customer) {
      qb.andWhere(
        new Brackets((qb) =>
          qb.where('tb_customer.fullname LIKE :fullname', { fullname: (`%${query.filter_customer}%`) })
            .orWhere('tb_customer.email LIKE :email', { email: `%${query.filter_customer}%` })
            .orWhere('tb_customer.telephone LIKE :telephone', { telephone: query.filter_customer })
        )
      )
    }
    if (joins.includes('full_address')) {
      qb.leftJoinAndSelect('tb_branch.province', 'tb_province')
        .leftJoinAndSelect('tb_branch.district', 'tb_district')
        .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
    }
    if (joins.includes('villa_media')) {
      qb.leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
    }
    qb.leftJoinAndSelect('tb_booking.payment_method', 'tb_payment_method')
    const response = await qb
      .offset((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()
    return transformResponse(response[0], response[1], page, limit);
  }

  async findOne(req: RequestHeader<Account>, id: string) {
    const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
      .where({ id: id, deleted: false })
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
      .leftJoin('tb_booking.customer', 'tb_customer')
      .addSelect(['tb_customer.id', 'tb_customer.email', 'tb_customer.telephone', 'tb_customer.fullname'])
      .leftJoin('tb_customer.avatar', 'tb_media')
      .addSelect(['tb_media.original_url'])
    if (!isSPAdmin(req.user)) {
      queryBuilder.andWhere(
        new Brackets((qb) => qb.where('tb_branch.id =:id', { id: req.user.branch?.id }))
      )
    }
    const response = await queryBuilder.getOne()
    if (!response) throw new NotFoundException('Cannot found')
    return { data: response };
  }

  async update(req: RequestHeader<Account>, id: string, body: UpdateBookingDto) {
    await this.bookingRe.createQueryBuilder('tb_booking')
      .update(Booking)
      .where({ id: id })
      .set({
        status_booking: body.booking_status,
        note: body.note,
        employee_update: req.user
      })
      .execute()
    return { status: 'Update booking success !' };
  }

  async remove(id: string) {
    await this.bookingRe.createQueryBuilder('tb_booking')
      .update(Booking)
      .where({ id: id })
      .set({ deleted: true })
      .execute()
    return { data: 'Delete booking success !' };
  }
  async createByCustomer(req: RequestHeader<Customer>, body: CreateBookingCustomerDto) {
    try {
      const customer = await this.customerRe.createQueryBuilder('tb_customer')
        .where({ id: req.user.id, email: req.user.email })
        .getOne()
      const nights = rangeDate(body.from_date_booking, body.to_date_booking)
      if (nights <= 0) throw new BadRequestException('Date to is invalid')
      if (!customer) throw new UnauthorizedException()
      const branch = await this.branchRe.createQueryBuilder('tb_branch')
        .where({ id: body.branch_id, deleted: false }).getOne()
      if (!branch) throw new NotFoundException('Cannot found branch')
      const villa = await this.villaRe.createQueryBuilder('tb_villa')
        .where({ id: body.villa_id, deleted: false }).getOne()
      if (!villa) throw new NotFoundException('Cannot found villa')
      const payment_method = await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
        .where({ name_key: body.payment_method }).getOne()
      if (!payment_method) throw new NotFoundException("Cannot found payment method")
      const booking = new Booking()
      booking.customer = customer
      booking.branch = branch
      booking.villa = villa
      booking.from_date_booking = body.from_date_booking
      booking.to_date_booking = body.to_date_booking
      booking.nights = nights
      booking.customer_count = body.customer_count
      booking.baby_count = body.baby_count ?? 0
      booking.note = body.note
      booking.amount = nights * villa.special_price
      booking.booking_platform = 'WEB_CLIENT'
      booking.payment_method = payment_method
      if (payment_method.name_key === payKey.CASH) {
        const response = await this.bookingRe.save(booking)
        delete response.customer.password
        await this.sendMail.onSendMail({
          to: customer.email,
          subject: 'Houston - Confirm Booking ✔',
          template: 'booking_confirm',
          context: {
            data: {
              customer: customer,
              villa: villa,
              villa_price: formatPrice(villa.special_price),
              date_from: moment(response.from_date_booking).format('DD/MM/YYYY'),
              date_to: moment(response.to_date_booking).format('DD/MM/YYYY'),
              nights: nights,
              customer_count: `Bao gồm ${response.customer_count + response.baby_count} người 
            (${response.customer_count} người lớn ${response.baby_count > 0 ? ` & ${response.baby_count} trẻ em` : ''})`,
              amount: formatPrice(response.amount)
            }
          }
        })
        return { data: response }
      }
      if (payment_method.name_key === payKey.VNPAY) {
        if (!await this.paymentMethodRe.createQueryBuilder('tb_payment_method')
          .where({ name_key: body.payment_method, name_children_key: body.payment_method_bank })
          .getOne()) throw new NotFoundException('Cannot found method bank')
        const result = this.vnpayService.createPaymentGateway({
          req, amount: nights * villa.special_price, bankCode: body.payment_method_bank
        })
        const gateway = new PaymentGateway()
        gateway.amount = nights * villa.special_price
        gateway.description = `Thanh toán cho thuê villa ${villa.name}`
        gateway.transaction = result.transaction
        gateway.txn_ref = result.txn_ref
        gateway.payment_url = result.payment_url
        gateway.callback_url = result.callback_url
        gateway.secure_hash = result.secure_hash
        const resGateway = await this.paymentGatewayRe.save(gateway)
        booking.payment_gateway = resGateway
        const response = await this.bookingRe.save(booking)
        delete response.customer.password
        return { data: response }
      }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
  async findAllByCustomer(req: RequestHeader<Customer>, query: QueryBookingCustomer) {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const joins = query.includes?.trim()?.split('|') ?? []
    const user = req.user
    const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
      .where({ deleted: false })
      .leftJoin('tb_booking.customer', 'tb_customer')
      .leftJoinAndSelect('tb_booking.payment_gateway','tb_payment_gateway')
      .leftJoinAndSelect('tb_booking.payment_method','tb_payment_method')
      .addSelect(['tb_customer.id', 'tb_customer.fullname'])
      .andWhere(
        new Brackets((qb) => qb.where('tb_customer.id =:id', { id: user.id }))
      )
    queryBuilder
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
    if (query.status_booking) {
      queryBuilder.andWhere(
        new Brackets((qb) => qb.where(
          'tb_booking.status_booking =:status_booking',
          { status_booking: query.status_booking })
        )
      )
    }
    if (joins.includes('full_address')) {
      queryBuilder.leftJoinAndSelect('tb_branch.province', 'tb_province')
        .leftJoinAndSelect('tb_branch.district', 'tb_district')
        .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
    }
    if (joins.includes('villa_media')) {
      queryBuilder.leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
    }

    const [data, total] = await queryBuilder
      .orderBy('tb_booking.created_at', "DESC")
      .offset((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()
    return transformResponse(data, total, page, limit)
  }
  async findOneByCustomer(req: RequestHeader<Customer>, id: string) {
    const queryBuilder = this.bookingRe.createQueryBuilder('tb_booking')
      .where({ deleted: false, id: id })
      .leftJoinAndSelect('tb_booking.payment_gateway','tb_payment_gateway')
      .orWhere(
        new Brackets((qb) => qb.orWhere('tb_payment_gateway.txn_ref =:txn_ref',{txn_ref: id}))
      )
      .leftJoin('tb_booking.customer', 'tb_customer')
      .addSelect(['tb_customer.id', 'tb_customer.fullname'])
      .andWhere(
        new Brackets((qb) => qb.where('tb_customer.id =:id', { id: req.user.id }))
      )
      .leftJoinAndSelect('tb_booking.branch', 'tb_branch')
      .leftJoinAndSelect('tb_booking.villa', 'tb_villa')
      .leftJoinAndSelect('tb_branch.province', 'tb_province')
      .leftJoinAndSelect('tb_branch.district', 'tb_district')
      .leftJoinAndSelect('tb_branch.ward', 'tb_ward')
      .leftJoinAndSelect('tb_villa.thumbnail', 'tb_media')
      .leftJoinAndSelect('tb_booking.payment_method','tb_payment_method')
    const response = await queryBuilder.getOne()
    if (!response) throw new NotFoundException('Cannot found')
    return { data: response }
  }
}
