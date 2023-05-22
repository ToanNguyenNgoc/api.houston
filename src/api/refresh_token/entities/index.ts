import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'tb_refresh_token' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  refresh_token: string

  @Column()
  user_agent: string

  @Column()
  type: string

  @CreateDateColumn()
  created_at: Date

}