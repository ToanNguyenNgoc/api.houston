import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities';
import { JwtModule } from '@nestjs/jwt';
import { Branch } from '../branches/entities';
import { Media } from '../media/entities';
import { OtpEntity } from '../otp/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Branch, Media, OtpEntity]),
        JwtModule
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,],
})
export class AuthModule { }
