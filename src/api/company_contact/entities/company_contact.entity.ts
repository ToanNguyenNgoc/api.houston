import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Company } from '../../company/entities'

@Entity('tb_company_contact')
export class CompanyContact {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 'TELEPHONE' })
  contact_type: string

  @Column({ nullable: false })
  contact_info:string

  @Column({ default: true })
  status: boolean

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Company, (company) => company.contacts)
  company:Company
}
