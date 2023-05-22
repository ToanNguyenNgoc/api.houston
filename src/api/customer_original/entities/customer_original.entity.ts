import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Customer } from '../../customer/entities'

@Entity({ name: 'tb_customer_original' })
export class CustomerOriginal {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Customer, (customer) => customer.customer_original)
  customers: Customer[]
}
