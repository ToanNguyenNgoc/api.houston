import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity({ name: 'tb_payment_gateway' })
export class PaymentGateway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'PENDING' })
  status: string

  @Column()
  amount: number;

  @Column({ default: '' })
  description: string;

  @Column()
  transaction: string;

  @Column({ nullable: true })
  txn_ref: string;

  @Column({ nullable: true, length:1000 })
  payment_url: string;

  @Column({ nullable: true })
  callback_url: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({nullable:true, length:500})
  secure_hash:string;
}