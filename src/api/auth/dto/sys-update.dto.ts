import { ApiProperty } from "@nestjs/swagger"

export class SysUpdateProfileDTO {
  @ApiProperty()
  fullname: string
  @ApiProperty()
  telephone: string
  @ApiProperty()
  description: string
  @ApiProperty()
  full_address: string
  @ApiProperty()
  sex: boolean
  @ApiProperty()
  ccid: string
  @ApiProperty()
  mediaId: number
}