import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { isDateDobFormat, generatePassword, convertBoolean } from '../../utils';
import { Media } from '../media/entities';
import { CustomerOriginal } from '../customer_original/entities';
import { QueryCustomerDTO } from './dto';
import { transformResponse } from '../../common';
import { TransformData } from '../../interface'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>,
    @InjectRepository(CustomerOriginal)
    private readonly CustomerOriginalRe: Repository<CustomerOriginal>
  ) { }
  async create(body: CreateCustomerDto) {
    try {
      if (body.dob && !isDateDobFormat(body.dob)) {
        throw new BadRequestException('Date is must be format YYYY-MM-DD')
      }
      if (
        await this.customerRepository
          .createQueryBuilder('tb_customer')
          .where({ email: body.email })
          .getOne()
      ) {
        throw new BadRequestException('`Email belong to another account`')
      }
      if (
        await this.customerRepository
          .createQueryBuilder('tb_customer')
          .where({ telephone: body.telephone })
          .getOne()
      ) {
        throw new BadRequestException('`Telephone belong to another account`')
      }
      if (
        await this.customerRepository
          .createQueryBuilder('tb_customer')
          .where({ ccid: body.ccid })
          .getOne()
      ) {
        throw new BadRequestException('`Ccid belong to another account`')
      }
      const avatar = await this.mediaRe
        .createQueryBuilder('tb_media')
        .where({ id: body.media_id })
        .getOne()
      const original = await this.CustomerOriginalRe
        .createQueryBuilder('tb_customer_original')
        .where({ id: body.customerOriginalId })
        .getOne()

      const customer = new Customer()
      customer.fullname = body.fullname
      customer.telephone = body.telephone
      customer.sex = body.sex
      customer.full_address = body.full_address
      customer.country = body.country
      customer.email = body.email
      customer.password = body.password ? await generatePassword(body.password) : null
      customer.dob = body.dob
      customer.ccid = body.ccid
      customer.job = body.job
      customer.avatar = avatar
      customer.customer_original = original
      customer.email_transfer = body.email
      const response = await this.customerRepository.save(customer)
      return response
    } catch (error) {
      throw new BadRequestException(`${error.message}`)
    }
  }

  async findAll(query: QueryCustomerDTO) {
    const page = parseInt(`${query.page ?? 1}`)
    const limit = parseInt(`${query.limit ?? 15}`)
    const status = convertBoolean(query.status)
    const sex = convertBoolean(query.sex)
    const original_id = query.original_id
    const response = await this.customerRepository
      .createQueryBuilder('tb_customer')
      .where({ deleted: false })
      .andWhere(new Brackets((qb) => qb.where(query.status ? { status: status } : {})))
      .andWhere(new Brackets((qb) => qb.where(query.sex ? { sex: sex } : {})))
      .andWhere(
        new Brackets((qb) => {
          qb.where({ fullname: Like(`%${query.search ?? ''}%`) })
            .orWhere({ telephone: Like(`%${query.search ?? ''}`) })
            .orWhere({ email: Like(`%${query.search ?? ''}`) })
            .orWhere({ ccid: Like(`%${query.search ?? ''}`) })
            .orWhere({ full_address: Like(`%${query.search ?? ''}`) })
        }),
      )
      .andWhere(
        new Brackets((qb) => qb.where(
          original_id ? 'tb_customer_original.id =:id' : '',
          original_id ? { id: original_id } : {}
        ))
      )
      .leftJoinAndSelect('tb_customer.customer_original', 'tb_customer_original')
      .leftJoin('tb_customer.avatar', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .offset((page * limit) - limit)
      .limit(limit)
      .getManyAndCount()
    const customers = response[0]?.map(item => {
      delete item.password
      return item
    })
    return transformResponse(customers, response[1], page, limit)
  }

  async findOne(id: string): Promise<TransformData<Customer>> {
    const response = await this.customerRepository
      .createQueryBuilder('tb_customer')
      .where({ id: id, deleted: false })
      .leftJoinAndSelect('tb_customer.customer_original', 'tb_customer_original')
      .leftJoin('tb_customer.avatar', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .getOne()
    delete response.password
    if (!response) throw new NotFoundException('Can not found')
    return { data: response };
  }

  async update(id: string, body: UpdateCustomerDto) {
    if (body.dob && !isDateDobFormat(body.dob)) {
      throw new BadRequestException('Date is must be format YYYY-MM-DD')
    }
    const response = await this.customerRepository
      .createQueryBuilder('tb_customer')
      .where({ id: id, deleted: false })
      .getOne()
    if (!response) throw new NotFoundException('Can not found')
    if (
      await this.customerRepository
        .createQueryBuilder('tb_customer')
        .where({ telephone: body.telephone })
        .getOne()
    ) {
      throw new BadRequestException('`Telephone belong to another account`')
    }
    if (
      await this.customerRepository
        .createQueryBuilder('tb_customer')
        .where({ ccid: body.ccid })
        .getOne()
    ) {
      throw new BadRequestException('`Ccid belong to another account`')
    }
    await this.customerRepository
      .createQueryBuilder('tb_customer')
      .update(Customer)
      .where({ id: id })
      .set({
        fullname: body.fullname,
        telephone: body.telephone,
        ccid: body.ccid,
        sex: body.sex,
        status: body.status,
        full_address: body.full_address,
        country: body.country,
        dob: body.dob,
        job: body.job,
        avatar: await this.mediaRe.createQueryBuilder('tb_media').where({ id: body.media_id }).getOne(),
        customer_original: await this.CustomerOriginalRe
          .createQueryBuilder('tb_customer_original')
          .where({ id: body.customerOriginalId })
          .getOne()
      })
      .execute()
    return { message: 'Update account success' };
  }

  async remove(id: string) {
    const response = await this.customerRepository
      .createQueryBuilder('tb_customer')
      .where({ id: id, deleted: false })
      .getOne()
    if (!response) throw new NotFoundException('Can not found')
    await this.customerRepository
      .createQueryBuilder('tb_customer')
      .update(Customer)
      .where({ id: id })
      .set({ deleted: true })
      .execute()
    return { message: 'Remove account success' };
  }
}
