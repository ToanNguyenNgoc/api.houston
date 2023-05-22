import { PartialType } from '@nestjs/swagger';
import { CreateCompanySocialDto } from './create-company_social.dto';

export class UpdateCompanySocialDto extends PartialType(CreateCompanySocialDto) {}
