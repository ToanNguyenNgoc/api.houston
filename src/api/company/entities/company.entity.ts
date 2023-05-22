import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'
import { CompanySocial } from '../../company_social/entities'
import { CompanyContact } from '../../company_contact/entities'

@Entity('tb_company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany(() => CompanySocial)
  @JoinTable()
  socials: CompanySocial[]

  @OneToMany(() => CompanyContact, (company_contact) => company_contact.company)
  contacts: CompanyContact[]
}
