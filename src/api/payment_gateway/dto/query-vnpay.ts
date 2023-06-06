import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryVnpay {
  @ApiProperty()
  @IsNotEmpty()
  txn_ref: string;
}