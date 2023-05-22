import { ApiProperty } from "@nestjs/swagger";

export class UpdateAccountDto {
  @ApiProperty()
  fullname: string

  @ApiProperty()
  telephone: string

  @ApiProperty()
  ccid:string

  @ApiProperty()
  mediaId:number

  @ApiProperty()
  description: string

  @ApiProperty()
  status: boolean

  @ApiProperty()
  full_address: string

  @ApiProperty()
  sex: boolean

  @ApiProperty()
  roles: number[]

  @ApiProperty()
  branch_id:number
}
