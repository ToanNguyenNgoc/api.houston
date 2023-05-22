import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Branch } from "../../branches/entities";

@Entity({ name: 'tb_province' })
export class Province {
  @PrimaryColumn()
  code: number

  @Column()
  name: string

  @Column()
  division_type: string

  @Column()
  codename: string

  @Column()
  phone_code: number

  @OneToMany(() => Branch, (branch) => branch.province)
  branches: Branch[]
}
@Entity({ name: 'tb_district' })
export class District {
  @PrimaryColumn()
  code: number
  @Column()
  name: string
  @Column()
  division_type: string
  @Column()
  codename: string
  @Column()
  province_code: number
  @OneToMany(() => Branch, (branch) => branch.district)
  branches: Branch[]
}

@Entity({ name: 'tb_ward' })
export class Ward {
  @PrimaryColumn()
  code: number
  @Column()
  name: string
  @Column()
  division_type: string
  @Column()
  codename: string
  @Column()
  district_code: number
  @OneToMany(() => Branch, (branch) => branch.ward)
  branches: Branch[]
}

