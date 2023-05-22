import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty()
  fullname: string
  @ApiProperty()
  telephone: string
  @ApiProperty()
  sex: boolean
  @ApiProperty()
  status: boolean
  @ApiProperty()
  full_address: string
  @ApiProperty()
  country: string
  @ApiProperty()
  dob: Date
  @ApiProperty()
  ccid: string
  @ApiProperty()
  job: string
  @ApiProperty()
  media_id: number
  @ApiProperty()
  customerOriginalId: number
}
