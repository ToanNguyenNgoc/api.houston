import { Injectable } from '@nestjs/common';
import { CreateCompanySocialDto } from './dto/create-company_social.dto';
import { UpdateCompanySocialDto } from './dto/update-company_social.dto';

@Injectable()
export class CompanySocialService {
  create(createCompanySocialDto: CreateCompanySocialDto) {
    return 'This action adds a new companySocial';
  }

  findAll() {
    return `This action returns all companySocial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companySocial`;
  }

  update(id: number, updateCompanySocialDto: UpdateCompanySocialDto) {
    return `This action updates a #${id} companySocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySocial`;
  }
}
