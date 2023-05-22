import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { Permission } from '../../permission/entities/permission.entity'

@Entity({ name: 'tb_role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique:true })
  title: string;

  @Column({nullable:false})
  code:string

  @Column({ default: true })
  status: boolean;

  @Column({ default: false })
  deleted: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]
}