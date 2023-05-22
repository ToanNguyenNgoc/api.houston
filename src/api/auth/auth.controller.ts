/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtSysGuard } from '../../middlewares/guards';
import { name } from '../../common';
import { AuthService } from './auth.service';
import { SysForgot, SysLoginGTO, SysUpdateProfileDTO } from './dto';
import { RequestHeader } from '../../interface'
import { Account } from '../account/entities';
import { Request } from "express"
import { AuthSystemGuard } from './authsystem.guard';

@ApiSecurity('x-api-key')
@Controller('system/auth')
@ApiTags('system')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('login')
  onLogin(@Body() body: SysLoginGTO) {
    return this.authService.onLogin(body)
  }
  @Get('profile')
  @UseGuards(JwtSysGuard, AuthSystemGuard)
  @ApiBearerAuth(name.JWT)
  onProfile(@Req() req: RequestHeader<Account>) {
    return this.authService.onProfile(req)
  }
  @Put('profile')
  @UseGuards(JwtSysGuard, AuthSystemGuard)
  @ApiBearerAuth(name.JWT)
  onUpdateProfile(
    @Req() req: RequestHeader<Account>,
    @Body() updateProfileDTO: SysUpdateProfileDTO
  ) {
    return this.authService.onUpdateProfile(req, updateProfileDTO)
  }
  @Get('roles')
  @UseGuards(JwtSysGuard, AuthSystemGuard)
  @ApiBearerAuth(name.JWT)
  findAllRoleByUser(@Req() req: RequestHeader<Account>) {
    return this.authService.findAllRoleByUser(req)
  }
  @Get('branch')
  @UseGuards(JwtSysGuard, AuthSystemGuard)
  @ApiBearerAuth(name.JWT)
  findBranchByUser(@Req() req: RequestHeader<Account>) {
    return this.authService.findBranchByUser(req)
  }
  @Post('forgot')
  forgot(@Req() req: Request, @Body() body: SysForgot) {
    return this.authService.forgot(req, body)
  }
}
