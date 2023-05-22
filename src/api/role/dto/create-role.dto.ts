import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly permissions: number[]
}