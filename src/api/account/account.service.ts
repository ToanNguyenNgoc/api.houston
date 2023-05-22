import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { Role } from '../role/entities';
import { CreateAccountDto, QueryAccountDTO, UpdateAccountDto } from './dto';
import { Account } from './entities';
import * as bcrypt from 'bcrypt'
import { Promise } from 'bluebird'
import { convertBoolean, encode, isSPAdmin } from '../../utils'
import { TransformData, TransformMessage, RequestHeader } from '../../interface';
import { key, transformResponse } from '../../common';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>
  ) { }
  async create(req: RequestHeader<Account>, body: CreateAccountDto) {
    const userCreate = req.user
    const branchDependencyUserCreate = userCreate.branch?.id ?? body.branch_id
    try {
      const currentEmail = await this.accountRepository.findOneBy({ email: body.email })
      if (currentEmail) throw new ForbiddenException(`Email belong to another account`)
      const currentTelephone = await this.accountRepository.findOneBy({ telephone: body.telephone })
      if (currentTelephone) throw new ForbiddenException(`Telephone belong to another account`)
      const salt = await bcrypt.genSalt(10)
      const password_hashed = await bcrypt.hash(body.password, salt)
      const account = new Account()
      account.telephone = body.telephone
      account.email = body.email
      account.fullname = body.fullname
      account.password = password_hashed
      account.full_address = body.full_address
      account.sex = body.sex
      account.ccid = body.ccid
      const roles = await Promise.map(body.roles ?? [], async (role_id: number) => {
        const role = await this.
          roleRepository.
          findOneBy({ id: role_id, status: true, deleted: false })
        return role
      }).filter(Boolean)
      account.roles = roles
      const resBranch = await this.branchRepository
        .createQueryBuilder('tb_branch')
        .where({ id: branchDependencyUserCreate })
        .getOne()
      if (!resBranch) {
        throw new NotFoundException('Not found')
      }
      account.branch = resBranch
      const response = await this.accountRepository.save(account)
      delete response.password
      return response
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
  async createInitial(body: CreateAccountDto) {
    const count = await this.accountRepository.count()
    if (count > 0) throw new NotFoundException('Not found')
    const role = await this.roleRepository.findOneBy({ code: encode('Super Admin') })
    const initialAccount = new Account()
    const salt = await bcrypt.genSalt(10)
    const password_hashed = await bcrypt.hash(body.password, salt)
    initialAccount.fullname = body.fullname
    initialAccount.email = body.email
    initialAccount.password = password_hashed
    initialAccount.telephone = body.telephone
    initialAccount.description = body.description
    initialAccount.full_address = body.full_address
    initialAccount.sex = body.sex
    initialAccount.roles = [role]
    const response = await this.accountRepository.save(initialAccount)
    delete response.password
    delete response.roles
    return response
  }

  async findAll(
    req: RequestHeader<Account>,
    query: QueryAccountDTO
  ): Promise<TransformData<Account[]>> {
    try {
      const branch_id = req.user?.branch?.id ?? query.filter_branch_id
      const page = parseInt(`${query.page ?? 1}`)
      const limit = parseInt(`${query.limit ?? 15}`)
      const status = convertBoolean(query.status)
      const response = await this.accountRepository
        .createQueryBuilder('tb_account')
        .select([
          'tb_account.id',
          'tb_account.telephone',
          'tb_account.email',
          'tb_account.fullname',
          'tb_account.ccid',
          'tb_account.status',
          'tb_account.description',
          'tb_account.full_address',
          'tb_account.sex',
          'tb_account.deleted',
          'tb_account.created_at',
          'tb_account.updated_at',
          'tb_account.media'
        ])
        .leftJoinAndSelect('tb_account.roles', 'tb_role')
        .leftJoinAndSelect('tb_account.branch', 'tb_branch')
        .leftJoin('tb_account.media', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .offset((page * limit) - limit)
        .where({ deleted: false })
        .andWhere(
          new Brackets((qb) => qb.where(query.status ? { status: status } : {}))
        )
        .andWhere(
          new Brackets((qb) => {
            qb.where({ fullname: Like(`%${query.search ?? ''}%`) })
              .orWhere({ telephone: Like(`%${query.search ?? ''}`) })
              .orWhere({ email: Like(`%${query.search ?? ''}`) })
              .orWhere({ ccid: Like(`%${query.search ?? ''}`) })
          }),
        )
        .andWhere(
          new Brackets((qb) => {
            qb.where(
              branch_id ? 'tb_branch.id =:id' : '',
              branch_id ? { id: branch_id } : {})
          }),
        )
        .limit(limit)
        .getManyAndCount()
      return transformResponse(response[0], response[1], page, limit)
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }

  async findOne(id: number): Promise<TransformData<Account>> {
    const response = await this.accountRepository
      .createQueryBuilder('tb_account')
      .leftJoinAndSelect('tb_account.roles', 'tb_role')
      .leftJoinAndSelect('tb_account.branch', 'tb_branch')
      .leftJoin('tb_account.media', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .where({ id: id })
      .andWhere({ deleted: false })
      .getOne()
    if (!response) {
      throw new NotFoundException(`Cannot not found`)
    }
    delete response.password
    return { data: response }
  }

  async update(req: RequestHeader<Account>, id: number, updateAccountDto: UpdateAccountDto) {
    const currentTelephone = await this.accountRepository
      .createQueryBuilder('tb_account')
      .where({ telephone: updateAccountDto.telephone })
      .getOne()
    if (currentTelephone && updateAccountDto.telephone) {
      throw new ForbiddenException(`Telephone belong to another account`)
    }
    const response = await this.accountRepository
      .createQueryBuilder('tb_account')
      .leftJoinAndSelect('tb_account.roles', 'tb_role')
      .where({ id: id })
      .getOne()
    if (!response) {
      throw new NotFoundException(`Cannot not found`)
    }
    const media = await this.mediaRepository
      .createQueryBuilder('tb_media')
      .where({ id: updateAccountDto.mediaId })
      .getOne()
    if (response && response.roles.map(role => role.code).includes(encode(key.SUPER_ADMIN))) {
      await this.accountRepository
        .createQueryBuilder('tb_account')
        .where({ id: id })
        .update(Account)
        .set({
          fullname: updateAccountDto.fullname,
          telephone: updateAccountDto.telephone,
          description: updateAccountDto.description,
          sex: updateAccountDto.sex,
          full_address: updateAccountDto.full_address,
          media: media,
          ccid: updateAccountDto.ccid
        })
        .execute()
      return { message: 'Update account success' }
    }
    if (updateAccountDto.roles) {
      const roles = await Promise.map(updateAccountDto.roles, async (role_id: number) => {
        const role = await this.roleRepository
          .createQueryBuilder('tb_role')
          .where({ id: role_id })
          .getOne()
        if (!role) {
          throw new NotFoundException('Can not found')
        }
        if (role.code === encode(key.SUPER_ADMIN)) {
          return null
        }
        return role
      })
      response.roles = roles
      await this.accountRepository.save(response)
    }
    if (isSPAdmin(req.user)) {
      const branch = await this.branchRepository
        .createQueryBuilder('tb_branch')
        .where({ id: updateAccountDto.branch_id })
        .getOne()
      response.branch = branch
      await this.accountRepository.save(response)
    }
    await this.accountRepository
      .createQueryBuilder('tb_account')
      .where({ id: id })
      .update(Account)
      .set({
        telephone: updateAccountDto.telephone,
        fullname: updateAccountDto.fullname,
        description: updateAccountDto.description,
        status: updateAccountDto.status,
        full_address: updateAccountDto.full_address,
        sex: updateAccountDto.sex,
        media: media,
        ccid: updateAccountDto.ccid
      })
      .execute()
    return { message: 'Update account success' }
  }

  async remove(id: number): Promise<TransformMessage> {
    const response = await this.accountRepository
      .createQueryBuilder('tb_account')
      .leftJoinAndSelect('tb_account.roles', 'tb_role')
      .where({ id: id })
      .getOne()
    if (!response) {
      throw new NotFoundException(`Cannot not found`)
    }
    if (response && response.roles.map(role => role.code).includes(encode(key.SUPER_ADMIN))) {
      throw new ForbiddenException('Cannot delete this account')
    }
    await this.accountRepository
      .createQueryBuilder('tb_account')
      .where({ id: id })
      .update(Account)
      .set({ deleted: true })
      .execute()
    return {
      message: 'Delete account success'
    }
  }
}
