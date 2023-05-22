import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  permission_path: string[]
}
