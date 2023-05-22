import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm"

@Entity("tb_media")
export class Media {
  @PrimaryGeneratedColumn()
  id: number


  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  file_name: string

  @Column({ nullable: true })
  mime_type: string

  @Column({ nullable: true })
  size: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @Column({ nullable: true })
  original_url: string

}
