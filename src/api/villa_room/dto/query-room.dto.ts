import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class QueryRoomDTO {
  @ApiProperty({ required: false })
  page: number

  @ApiProperty({ required: false })
  limit: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  villa_id: number

  @ApiProperty({ required: false })
  status: boolean
}