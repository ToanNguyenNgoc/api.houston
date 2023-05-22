import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerOriginalDto } from './dto/create-customer_original.dto';
import { UpdateCustomerOriginalDto } from './dto/update-customer_original.dto';
import { CustomerOriginal } from './entities';
import { TransformData, TransformMessage } from '../../interface'

@Injectable()
export class CustomerOriginalService {
  constructor(
    @InjectRepository(CustomerOriginal)
    private readonly cusOriRepository: Repository<CustomerOriginal>
  ) { }
  async create(body: CreateCustomerOriginalDto): Promise<TransformData<CustomerOriginal>> {
    try {
      const original = new CustomerOriginal()
      original.name = body.name
      const response = await this.cusOriRepository.save(body)
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findAll(): Promise<TransformData<CustomerOriginal[]>> {
    try {
      const response = await this.cusOriRepository
        .createQueryBuilder('tb_customer_original')
        .where({ deleted: false })
        .getManyAndCount()
      return { data: response[0], total: response[1] }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: number): Promise<TransformData<CustomerOriginal>> {
    const response = await this.cusOriRepository
      .createQueryBuilder('tb_customer_original')
      .where({ id: id, deleted: false })
      .getOne()
    if (!response) throw new NotFoundException('Cannot found')
    return { data: response }
  }

  async update(id: number, body: UpdateCustomerOriginalDto): Promise<TransformMessage> {
    const response = await this.cusOriRepository
      .createQueryBuilder('tb_customer_original')
      .where({ id: id, deleted: false })
      .getOne()
    if (!response) throw new NotFoundException('Cannot found')
    await this.cusOriRepository
      .createQueryBuilder('tb_customer_original')
      .update(CustomerOriginal)
      .set({
        name: body.name,
        status: body.status
      })
      .where({ id: id, deleted: false })
      .execute()
    return { message: 'Update success' }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} customerOriginal`;
  // }
}
