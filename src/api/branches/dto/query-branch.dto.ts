import { ApiProperty } from "@nestjs/swagger";

export class QueryBranchDTO {
  @ApiProperty({ default: 1, required:false })
  page: number;
  @ApiProperty({ default: 15, required:false })
  limit: number;
  @ApiProperty({ description: 'Support name', required:false })
  search: string;
  @ApiProperty({required:false})
  status:boolean
  @ApiProperty({required:false})
  province_code:number
  @ApiProperty({required:false})
  district_code:number
  @ApiProperty({required:false})
  ward_code:number
} 