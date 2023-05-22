import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'tb_permission' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, })
  permission_path: string


  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}