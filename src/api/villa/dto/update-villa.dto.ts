import { ApiProperty } from '@nestjs/swagger';
export class UpdateVillaDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  media_id: string;

  @ApiProperty()
  branch_id: string;

  @ApiProperty()
  villa_cate_id: string;

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  special_price: number

  @ApiProperty()
  weekend_price: number

  @ApiProperty()
  holiday_price: number

  @ApiProperty()
  acreage: number

  @ApiProperty()
  status: true
}
