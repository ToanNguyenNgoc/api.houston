import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities'
import {
  ForgotAuthCustomer,
  LoginAuthCusDTO,
  RefreshTokenDTO,
  RegisterAuthCustomerDTO,
  UpdateAuthCustomerDto
} from './dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RequestHeader } from '../../interface';
import { OtpEntity } from '../otp/entities'
import * as moment from 'moment'
import { SendMailService } from '../../services'
import { Media } from '../media/entities'
import { aesDecode, aesEncode, generatePassword, isDateDobFormat, randomCode } from '../../utils';
import { RefreshToken } from '../refresh_token/entities';
import { name } from '../../common';
import { Account } from '../account/entities';

@Injectable()
export class AuthCustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRe: Repository<Customer>,
    @InjectRepository(OtpEntity)
    private readonly otpRe: Repository<OtpEntity>,
    @InjectRepository(Media)
    private readonly mediaRe: Repository<Media>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRe: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService
  ) { }
  //login
  async login(req: Request, body: LoginAuthCusDTO, res: Response) {
    const response = await this.customerRe
      .createQueryBuilder('tb_customer')
      .leftJoin('tb_customer.avatar', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .where({ email: body.email })
      .getOne()
    if (!response) throw new NotFoundException(`Can not find account with email:${body.email}`)
    if (!response.status) throw new ForbiddenException('Account has been blocked!')
    if (response.deleted) throw new NotFoundException('Account has been deleted!')
    const passwordMatched = await bcrypt.compare(body.password, response.password)
    if (!passwordMatched) throw new ForbiddenException('Password is wrong!')
    delete response.password
    delete response.email_transfer
    const { token, token_expired_at } = await this.generateToken(response.id, response.email)
    const refresh_token = await this.generateRefreshToken(req, response.id, response.email)
    res
      // .cookie('access_token', token, {
      //   maxAge: name.AGE_TOKEN,
      //   secure: true,
      // })
      // .cookie('token_expired_at',token_expired_at,{
      //   maxAge:name.AGE_RE_TOKEN,
      //   secure:true
      // })
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: name.AGE_RE_TOKEN
      })
      .send({
        data: {
          ...response,
          token: token,
          token_expired_at: token_expired_at,
          refresh_token: refresh_token
        }
      });
  }
  async refreshToken(req: RequestHeader<Account>, res: Response) {
    const user = req.user
    const { token, token_expired_at } = await this.generateToken(user.id, user.email)
    res
      // .cookie('access_token', token, {
      //   secure: true,
      //   sameSite: 'lax',
      //   maxAge: name.AGE_TOKEN
      // })
      // .cookie('token_expired_at',token_expired_at,{
      //   maxAge:name.AGE_RE_TOKEN,
      //   secure:true
      // })
      .send({
        data: { token: token, token_expired_at: token_expired_at }
      })
    // return {message:user}
    // const response = await this.refreshTokenRe
    //   .createQueryBuilder('tb_refresh_token')
    //   .where({ refresh_token: body.refresh_token, user_agent: req.headers['user-agent'], type: 'CUSTOMER' })
    //   .getOne()
    // if (!response) throw new UnauthorizedException()
    // const data = JSON.parse(aesDecode(response.refresh_token))
    // const { token, token_expired_at } = await this.generateToken(data.id, data.email)
    // res
    //   .cookie('access_token', token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax',
    //     maxAge: 3600 * 1000 * 2
    //   })
    //   .cookie('refresh_token', body.refresh_token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax',
    //     maxAge: 3600 * 1000 * 2
    //   })
    //   .send({
    //     data: { token, token_expired_at, refresh_token: body.refresh_token }
    //   })
    // return { data: { token, token_expired_at, refresh_token: body.refresh_token } }
  }
  async generateToken(
    id: number,
    email: string,
  ): Promise<any> {
    const code = JSON.stringify({ id: id, email: email, type: 'CUSTOMER' })
    const token = await this.jwtService.signAsync({ code: aesEncode(code) }, {
      expiresIn: '2m',
      secret: process.env.JWT_KEY
    })
    const currentTime = new Date()
    const newTime = currentTime.getTime() + (60 * 1000 * 2) + (60 * 1000 * 60 * parseInt(process.env.TIME_ZONE_UTC))
    const token_expired_at = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
    return { token, token_expired_at }
  }
  async generateRefreshToken(req: Request, id: number, email: string): Promise<string> {
    const date = new Date()
    // const code = JSON.stringify({
    //   id: id,
    //   email: email,
    //   eTime: date.getTime()
    // })
    const refresh_token = await this.jwtService.signAsync({
      id: id,
      email: email,
      eTime: date.getTime(),
      type: 'CUSTOMER'
    }, {
      expiresIn: '15 days',
      secret: process.env.JWT_KEY
    })
    // const refresh = new RefreshToken()
    // refresh.refresh_token = refresh_token
    // refresh.user_agent = req.headers['user-agent']
    // refresh.type = 'CUSTOMER'
    // await this.refreshTokenRe.save(refresh)
    return refresh_token
  }
  async profile(req: RequestHeader<Customer>) {
    try {
      const response = await this.customerRe
        .createQueryBuilder('tb_customer')
        .where({ id: req.user.id, email: req.user.email })
        .leftJoin('tb_customer.avatar', 'tb_media')
        .addSelect(['tb_media.original_url'])
        .leftJoin('tb_customer.customer_original', 'tb_customer_original')
        .addSelect(['tb_customer_original.name'])
        .getOne()
      if (!response) throw new UnauthorizedException('Unauthorized')
      delete response.password
      delete response.email_transfer
      return { data: response }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized')
    }
  }
  async register(body: RegisterAuthCustomerDTO) {
    try {
      if (body.email && !body.code) {
        const code = randomCode(6).trim()
        await this.sendMailService.onSendMail({
          to: body.email,
          subject: 'Houston - Register ✔',
          template: 'otp',
          context: {
            data: {
              email: body.email,
              code: code
            }
          }
        })
        const otp = new OtpEntity()
        otp.email = body.email, otp.code = code
        await this.otpRe.save(otp)
        return { message: `An email send to ${body.email}` }
      }
      if (body.email && body.code) {
        const resOtp = await this.otpRe
          .createQueryBuilder('tb_otp')
          .where({ email: body.email, code: body.code })
          .getOne()
        if (!resOtp) {
          throw new NotFoundException('Code is invalid !')
        }
        const otpTime = moment(resOtp?.created_at).format('YYYYMMDDHHmm')
        const currentTime = moment().format('YYYYMMDDHHmm')
        if (parseInt(currentTime) - parseInt(otpTime) > 10) {
          await this.removeOtp(body.email, body.code)
          throw new BadRequestException('This code is expired')
        }
        if (body.dob && !isDateDobFormat(body.dob)) {
          throw new BadRequestException('Date is must be format YYYY-MM-DD')
        }
        if (
          await this.customerRe
            .createQueryBuilder('tb_customer')
            .where({ email: body.email })
            .getOne()
        ) {
          throw new BadRequestException('`Email belong to another account`')
        }
        if (
          await this.customerRe
            .createQueryBuilder('tb_customer')
            .where({ telephone: body.telephone })
            .getOne()
        ) {
          throw new BadRequestException('`Telephone belong to another account`')
        }
        //handle register
        const newCustomer = new Customer()
        newCustomer.email = body.email
        newCustomer.password = body.password ? await generatePassword(body.password) : undefined
        newCustomer.fullname = body.fullname ?? ''
        newCustomer.telephone = body.telephone
        newCustomer.full_address = body.full_address
        newCustomer.dob = body.dob
        newCustomer.country = body.country
        newCustomer.email_transfer = body.email
        const response = await this.customerRe.save(newCustomer)
        delete response.password
        delete response.email_transfer
        await this.removeOtp(body.email, body.code)
        await this.sendMailService.onSendMail({
          to: body.email,
          subject: 'Welcome to Houston ✔',
          template: 'welcome',
          context: {
            data: {
              fullname: body.fullname || body.email,
            }
          }
        })
        return { data: response }
      }
    } catch (error) {
      throw new BadRequestException(`${error}`)
    }
  }
  async updateProfile(
    req: RequestHeader<Customer>,
    body: UpdateAuthCustomerDto
  ) {
    const { user } = req
    if (body.dob && !isDateDobFormat(body.dob)) {
      throw new BadRequestException('Date is must be format YYYY-MM-DD')
    }
    if (await this.customerRe.createQueryBuilder('tb_customer')
      .where({ id: !user.id, email: body.telephone }).getOne()) {
      throw new BadRequestException('`Telephone belong to another account`')
    }
    if (await this.customerRe.createQueryBuilder('tb_customer')
      .where({ id: !user.id, ccid: body.ccid }).getOne()) {
      throw new BadRequestException('`CCID belong to another account`')
    }
    const media = await this.mediaRe
      .createQueryBuilder('tb_media')
      .where({ id: body.media_id })
      .getOne()
    const response = await this.customerRe.createQueryBuilder('tb_customer')
      .where({ id: user.id, email: user.email })
      .leftJoin('tb_customer.avatar', 'tb_media')
      .addSelect(['tb_media.original_url'])
      .getOne()
    delete response.password
    delete response.email_transfer
    await this.customerRe.createQueryBuilder('tb_customer')
      .update(Customer)
      .where({ id: user.id, email: user.email })
      .set({
        fullname: body.fullname,
        telephone: body.telephone !== response.telephone ? body.telephone : undefined,
        sex: body.sex,
        full_address: body.full_address,
        dob: body.dob,
        ccid: body.ccid !== response.ccid ? body.ccid : undefined,
        job: body.job,
        avatar: media ?? undefined,
        country: body.country
      })
      .execute()
    return {
      data: {
        ...response,
        ...body,
        avatar: { original_url: media?.original_url ?? response.avatar?.original_url }
      }
    }
  }
  async forgot(body: ForgotAuthCustomer) {
    if (!await this.customerRe.createQueryBuilder('tb_email').where({ email: body.email }).getOne()) {
      throw new BadRequestException('This email is not register')
    }
    if (!body.code && !body.new_password) {
      const code = randomCode(6).trim()
      await this.sendMailService.onSendMail({
        to: body.email,
        subject: 'Houston - Forgot password',
        template: 'otp',
        context: { data: { code: code } }
      })
      const otp = new OtpEntity()
      otp.email = body.email, otp.code = code
      await this.otpRe.save(otp)
      return { message: `An email send to ${body.email}` }
    }
    if (body.code && body.new_password) {
      const resOtp = await this.otpRe
        .createQueryBuilder('tb_otp')
        .where({ email: body.email, code: body.code })
        .getOne()
      if (!resOtp) {
        throw new NotFoundException('Code is invalid !')
      }
      const otpTime = moment(resOtp?.created_at).format('YYYYMMDDHHmm')
      const currentTime = moment().format('YYYYMMDDHHmm')
      if (parseInt(currentTime) - parseInt(otpTime) > 10) {
        await this.removeOtp(body.email, body.code)
        throw new BadRequestException('This code is expired')
      } else {
        await this.customerRe.createQueryBuilder('tb_customer')
          .update(Customer)
          .where({ email: body.email })
          .set({
            password: await generatePassword(body.new_password)
          })
          .execute()
        await this.removeOtp(body.email, body.code)
        return { message: 'Update password success!' }
      }
    }
  }
  async removeOtp(email: string, code: string) {
    await this.otpRe
      .createQueryBuilder('tb_otp')
      .delete()
      .from(OtpEntity)
      .where({ email: email, code: code })
      .execute()
  }
}
