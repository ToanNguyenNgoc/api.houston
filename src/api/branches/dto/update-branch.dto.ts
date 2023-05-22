import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateBranchDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  media_id: number

  @ApiProperty()
  content:string

  @ApiProperty()
  description:string

  @ApiProperty()
  status: boolean

  @ApiProperty()
  address: string

  @ApiProperty()
  province_code: number

  @ApiProperty()
  district_code: number

  @ApiProperty()
  ward_code: number

  @ApiProperty()
  lat:string

  @ApiProperty()
  lng:string
}
