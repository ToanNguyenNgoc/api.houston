import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Brackets, Repository } from 'typeorm';
import { CompanySocial } from '../company_social/entities';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities';
import { Media } from '../media/entities';
import { CompanyContact } from '../company_contact/entities';
import { Promise } from 'bluebird';
import { TransformData } from '../../interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRe: Repository<Company>,
    @InjectRepository(CompanySocial)
    private readonly companySocialRe: Repository<CompanySocial>,
    @InjectRepository(Media)
    private readonly mediaRe:Repository<Media>,
    @InjectRepository(CompanyContact)
    private readonly contactRe:Repository<CompanyContact>
  ) { }
  async create(body: CreateCompanyDto) {
    const contacts = await Promise.map(body.contacts, async (contact_id) => {
      return await this.contactRe
        .createQueryBuilder('tb_company_contact')
        .where({ id: contact_id })
        .andWhere(new Brackets((qb) => qb.where({ id: null })))
        .getOne()
    }).filter(Boolean)
    const company = new Company()
    company.name = body.name
    company.contacts = contacts
    const response = await this.companyRe.save(company)
    return { data: response }
  }

  async findAll(): Promise<TransformData<Company>> {
    const response = await this.companyRe
      .createQueryBuilder('tb_company')
      .leftJoinAndSelect(
        'tb_company.socials',
        'tb_company_social'
      )
      .leftJoinAndSelect('tb_company.contacts','tb_company_contact')
      .getManyAndCount()
    const data = response[0].map(item => {
      return {
        ...item,
        socials: item.socials.filter(i => i.status === true)
      }
    })
    return { data: data }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
