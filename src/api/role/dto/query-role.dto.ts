import { ApiProperty } from "@nestjs/swagger";

export class QueryRoleDTO {
  @ApiProperty({ required:false })
  is_super_admin: boolean
}