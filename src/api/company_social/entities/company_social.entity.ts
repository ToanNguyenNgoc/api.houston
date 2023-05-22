import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'

@Entity('tb_company_social')
export class CompanySocial {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  social_icon: string

  @Column({ nullable: true })
  social_link: string

  @Column({ nullable: true })
  social_name: string

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at
}
