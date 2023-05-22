import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'tb_channel_log' })
export class ChannelLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  header: string

  @Column()
  route: string

  @Column()
  action: string

  @CreateDateColumn()
  created_at: Date
}
