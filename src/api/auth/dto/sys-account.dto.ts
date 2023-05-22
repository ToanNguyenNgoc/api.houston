export class SysAccountDTO {
  readonly id: number;
  readonly telephone: string;
  readonly email: string;
  readonly fullname: string;
  readonly status: boolean;
  readonly description: string;
  readonly deleted: boolean;
  readonly created_at: Date;
  readonly update_at: Date;
  readonly token: string;
}