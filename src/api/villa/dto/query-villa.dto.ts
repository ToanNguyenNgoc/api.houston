import { ApiOAuth2, ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class QueryVillaDTO {
  @ApiProperty({ required: false })
  page: number

  @ApiProperty({ required: false })
  limit: number

  @ApiProperty({ required: false })
  branch_id: number

  @ApiProperty({ required: false })
  villa_cate_id: number

  @ApiProperty({ required: false })
  search: string

  @ApiProperty({ required: false })
  status: boolean

  @ApiProperty({ required: false })
  min_price: number

  @ApiProperty({ required: false })
  max_price: number

  @ApiProperty({ required: false, description: '-price or price' })
  @IsIn(['-price', 'price', null, undefined])
  sort_price: string

  @ApiProperty({ required: false, description: 'full_address' })
  @IsIn(['full_address', null, undefined])
  includes: string
}

export class QueryByIdVillaDTO {
  @ApiProperty({ required: false, description: 'category|branch|full_address' })
  includes: string
}