import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryVnpay{
  @ApiProperty()
  @IsNotEmpty()
  vnp_TxnRef:string;

  @ApiProperty()
  @IsNotEmpty()
  vnp_TransactionDate:string;
}