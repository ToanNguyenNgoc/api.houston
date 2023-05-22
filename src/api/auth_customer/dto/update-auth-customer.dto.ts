import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthCustomerDto {
  @ApiProperty()
  fullname?: string;
  @ApiProperty()
  telephone?: string;
  @ApiProperty()
  sex?: boolean;
  @ApiProperty()
  full_address?: string;
  @ApiProperty()
  dob?: Date;
  @ApiProperty()
  ccid?: string;
  @ApiProperty()
  job?: string;
  @ApiProperty()
  media_id?: number;
  @ApiProperty()
  country?: string;
}
