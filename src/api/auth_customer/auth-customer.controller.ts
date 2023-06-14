import { Controller, Get, Post, Body, UseGuards, Req, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthCustomerService } from './auth-customer.service';
import {
  ForgotAuthCustomer,
  LoginAuthCusDTO,
  RefreshTokenDTO,
  RegisterAuthCustomerDTO,
  UpdateAuthCustomerDto
} from './dto';
import { Customer } from '../customer/entities';
import { Request, Response } from 'express';
import { JwtCookieGuard, JwtRefreshGuard, JwtSysGuard } from '../../middlewares/guards';
import { RequestHeader } from '../../interface';
import { name } from '../../common';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';
import { Account } from 'src/api/account/entities';

@ApiSecurity('x-api-key')
@ApiTags('customers')
@Controller('customers/auth')
export class AuthCustomerController {
  constructor(private readonly authCustomerService: AuthCustomerService) { }
  @Post('register')
  register(@Body() body: RegisterAuthCustomerDTO) {
    return this.authCustomerService.register(body)
  }
  @Post('login')
  login(@Req() req: Request, @Body() body: LoginAuthCusDTO, @Res({ passthrough: true }) res: Response) {
    return this.authCustomerService.login(req, body, res)
  }
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authCustomerService.logout(res)
  }
  @Post('refresh_token')
  @UseGuards(JwtRefreshGuard)
  refreshToken(
    @Req() req: RequestHeader<Account>,
    // @Body() body: RefreshTokenDTO,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authCustomerService.refreshToken(req, res)
  }
  // @Recaptcha({ response: req => req.body.recaptcha, action: 'FORGOT_CUSTOMER', score: 0.8 })
  @Post('forgot')
  forgot(@Body() body: ForgotAuthCustomer) {
    return this.authCustomerService.forgot(body)
  }
  @UseGuards(JwtSysGuard)
  // @UseGuards(JwtCookieGuard)
  @ApiBearerAuth(name.JWT)
  @Get('profile')
  profile(@Req() req: RequestHeader<Customer>) {
    return this.authCustomerService.profile(req)
  }
  @UseGuards(JwtSysGuard)
  // @UseGuards(JwtCookieGuard)
  @ApiBearerAuth(name.JWT)
  @Put('profile')
  updateProfile(
    @Req() req: RequestHeader<Customer>,
    @Body() body: UpdateAuthCustomerDto
  ) {
    return this.authCustomerService.updateProfile(req, body)
  }
}
