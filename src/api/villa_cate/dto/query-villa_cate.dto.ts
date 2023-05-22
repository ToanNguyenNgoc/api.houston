import { ApiProperty } from "@nestjs/swagger";

export class QueryVillaCateDTO{
  @ApiProperty({required:false})
  page:number

  @ApiProperty({required:false})
  limit:number

  @ApiProperty({required:false})
  search:string

  @ApiProperty({required:false})
  branch_id:number

  @ApiProperty({required:false})
  status:boolean
}