import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsIn, IsNotEmpty } from "class-validator";

export class QueryMapDTO {
  @ApiProperty({
    required: false,
    description: 'Support address, coordinates Example: 10.800590217284448, 106.68205401591362'
  })
  search: string
  @ApiProperty({ description: 'type: address or coord' })
  @IsNotEmpty()
  @IsIn(['address', 'coord'])
  search_type: string
}