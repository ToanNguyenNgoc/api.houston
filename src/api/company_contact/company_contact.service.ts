import { Injectable } from '@nestjs/common';
import { CreateCompanyContactDto } from './dto/create-company_contact.dto';
import { UpdateCompanyContactDto } from './dto/update-company_contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyContact } from './entities';
import { Repository } from 'typeorm';
import { TransformData } from '../../interface';

@Injectable()
export class CompanyContactService {
  constructor(
    @InjectRepository(CompanyContact)
    private readonly contactRe:Repository<CompanyContact>
  ){}
  async create(body: CreateCompanyContactDto):Promise<TransformData<CompanyContact>> {
    const contact = new CompanyContact()
    contact.contact_type = body.contact_type
    contact.contact_info = body.contact_info
    const response = await this.contactRe.save(contact)

    return {data:response};
  }

  findAll() {
    return `This action returns all companyContact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyContact`;
  }

  update(id: number, updateCompanyContactDto: UpdateCompanyContactDto) {
    return `This action updates a #${id} companyContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyContact`;
  }
}
