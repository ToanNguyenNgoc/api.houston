import { ApiProperty } from "@nestjs/swagger";

export class QueryAccountDTO {
  @ApiProperty({ required: false, default: 1 })
  readonly page: number;
  @ApiProperty({ required: false, default: 15 })
  readonly limit: number;
  @ApiProperty({ required: false, description: 'Support fullname, telephone, email, ccid' })
  readonly search: string;
  @ApiProperty({ required: false, description: 'Filter branch id' })
  readonly filter_branch_id: string;
  @ApiProperty({ required: false })
  readonly status: boolean
  
}