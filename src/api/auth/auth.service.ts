/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities';
import { SysForgot, SysLoginGTO, SysUpdateProfileDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'
import { Branch } from '../branches/entities';
import { Promise } from 'bluebird'
import { Media } from '../media/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpEntity } from '../otp/entities';
import * as moment from 'moment';
import { RequestHeader, TransformData } from '../../interface';
import { aesEncode, randomCode } from '../../utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly mailerService: MailerService
  ) { }

  async onLogin(body: SysLoginGTO): Promise<TransformData<any>> {
    const responseUser = await this.accountRepository
      .createQueryBuilder('tb_account')
      .leftJoinAndSelect('tb_account.branch', 'tb_branch')
      .where({ email: body.email })
      .getOne()
    if (!responseUser) throw new NotFoundException(`Can not find account with email:${body.email}`)
    if (!responseUser.status) throw new ForbiddenException('Account has been blocked!')
    if (responseUser.deleted) throw new NotFoundException('Account has been deleted!')
    const passwordMatched = await bcrypt.compare(body.password, responseUser.password)
    if (!passwordMatched) throw new ForbiddenException('Password is wrong!')
    const token = await this.generateToken(
      responseUser.id,
      responseUser.email,
      responseUser.branch?.id ?? 0
    )
    delete responseUser.password
    return {
      data: { ...responseUser, token: token }
    }
  }
  async generateToken(
    id: number,
    email: string,
    branch_id: number
  ): Promise<string> {
    const code = JSON.stringify({ id: id, email: email, type: 'AUTHENTICATE' })
    return this.jwtService.signAsync({ code: aesEncode(code) }, {
      expiresIn: '10d',
      secret: '141'
    })
  }

  async onProfile(req: RequestHeader<Account>): Promise<TransformData<Account>> {
    try {
      const { user } = req
      const response = await this.accountRepository
        .createQueryBuilder('tb_account')
        .where({ id: user.id })
        .leftJoinAndSelect('tb_account.branch', 'tb_branch')
        .leftJoin('tb_account.media', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .getOne()
      delete response.password
      return { data: response }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
  async onUpdateProfile(
    req: RequestHeader<Account>,
    body: SysUpdateProfileDTO
  ): Promise<TransformData<Account>> {
    const id = req.user.id
    const alreadyTelephone = await this.accountRepository
      .createQueryBuilder('tb_account')
      .where({ telephone: body.telephone })
      .getOne()
    if (alreadyTelephone) {
      throw new ForbiddenException(`Telephone belong to another account`)
    }
    const media = await this.mediaRepository
      .createQueryBuilder('tb_media')
      .where({ id: body.mediaId })
      .getOne()
    await this.accountRepository
      .createQueryBuilder('tb_account')
      .update(Account)
      .set({
        fullname: body.fullname,
        telephone: body.telephone,
        description: body.description,
        full_address: body.full_address,
        sex: body.sex,
        ccid: body.ccid,
        media: media
      })
      .where({ id: id })
      .execute()
    const newProfile = { ...req.user, ...body }
    delete newProfile.password
    delete newProfile.roles
    return { data: newProfile }
  }

  async findAllRoleByUser(req: RequestHeader<Account>) {
    const user = req.user
    const account = await this.accountRepository
      .createQueryBuilder('tb_account')
      .where({ id: user.id })
      .leftJoinAndSelect('tb_account.roles', 'tb_role')
      .leftJoinAndSelect('tb_role.permissions', 'tb_permission')
      .getOne()
    const roles = await Promise.filter(account.roles, async (role) => (role.status && !role.deleted))
    return { data: roles }
  }
  async findBranchByUser(req: RequestHeader<Account>): Promise<TransformData<Branch[]>> {
    const user = req.user as any
    if (user.type !== "AUTHENTICATE") throw new UnauthorizedException()
    const branch_id = req.user.branch?.id
    const response = await this.branchRepository
      .createQueryBuilder('tb_branch')
      .where({ deleted: false })
      .where(branch_id ? { id: branch_id } : {})
      .getManyAndCount()
    return {
      data: response[0],
      total: response[1]
    }
  }
  async forgot(req: Request, body: SysForgot) {
    const responseEmail = await this.accountRepository.createQueryBuilder('tb_account')
      .where({ email: body.email }).getOne()
    if (!responseEmail) {
      throw new NotFoundException('This email is not exist')
    }
    if (!body.code && !body.new_password) {
      const code = randomCode(6).trim()
      await this.mailerService.sendMail({
        to: body.email,
        from: process.env.MAILER_ORIGINAL,
        subject: 'Houston - Forgot Password ✔',
        template: 'otp',
        context: {
          data: {
            email: body.email,
            code: code
          }
        }
      })
      const otp = new OtpEntity()
      otp.email = body.email
      otp.code = code
      await this.otpRepository.save(otp)
      return { message: 'Send code success' }
    } else {
      const resOtp = await this.otpRepository
        .createQueryBuilder('tb_otp')
        .where({ email: body.email, code: body.code })
        .getOne()
      if (!resOtp) {
        throw new NotFoundException('Code is invalid !')
      }
      const otpTime = moment(resOtp?.created_at).format('YYYYMMDDHHmm')
      const currentTime = moment().format('YYYYMMDDHHmm')
      if (parseInt(currentTime) - parseInt(otpTime) > 2) {
        await this.otpRepository
          .createQueryBuilder('tb_otp')
          .delete()
          .from(OtpEntity)
          .where({ email: body.email, code: body.code })
          .execute()
        throw new BadRequestException('This code is expired')
      }
      const salt = await bcrypt.genSalt(10)
      const password_hashed = await bcrypt.hash(body.new_password, salt)
      await this.accountRepository
        .createQueryBuilder('tb_account')
        .update(Account)
        .where({ email: body.email })
        .set({ password: password_hashed })
        .execute()
      await this.otpRepository
        .createQueryBuilder('tb_otp')
        .delete()
        .from(OtpEntity)
        .where({ email: body.email, code: body.code })
        .execute()
      return { message: 'Update password success' }
    }
  }
}
