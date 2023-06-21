import { ApiProperty } from "@nestjs/swagger";

export class QrFoodDTO {
  @ApiProperty({ required: false, default: 1 })
  page: number;

  @ApiProperty({ required: false, default: 15 })
  limit: number;

  @ApiProperty({ required: false, description: 'Support search food name, description' })
  search: string

  @ApiProperty({ required: false })
  branch_id: number;

  @ApiProperty({ required: false })
  food_cate_id: number

  @ApiProperty({ required: false })
  status: boolean
}