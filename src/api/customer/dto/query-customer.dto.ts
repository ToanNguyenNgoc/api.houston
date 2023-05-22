import { ApiProperty } from "@nestjs/swagger";

export class QueryCustomerDTO {
  @ApiProperty({ required: false, default: 1 })
  readonly page: number;
  @ApiProperty({ required: false, default: 15 })
  readonly limit: number;
  @ApiProperty({ required: false, description: 'Support fullname, telephone, email, ccid, address' })
  search: string
  @ApiProperty({ required: false })
  status: boolean
  @ApiProperty({ required: false })
  readonly sex: boolean
  @ApiProperty({ required: false })
  readonly original_id: number
}