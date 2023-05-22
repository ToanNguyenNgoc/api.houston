import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVillaCateDto } from './create-villa_cate.dto';

export class UpdateVillaCateDto extends PartialType(CreateVillaCateDto) {
  @ApiProperty()
  villa_cate_name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  media_id?: number;

  @ApiProperty()
  branch_id?: number;

  @ApiProperty()
  status:boolean
}
