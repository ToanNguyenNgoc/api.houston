import { OauthService } from './oauth.service';


import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/api/customer/entities';
import { OAuthController } from 'src/api/oauth/oauth.controller';
import { GenerateToken } from 'src/services';

@Module({
    imports: [JwtModule, TypeOrmModule.forFeature([Customer])],
    controllers: [OAuthController],
    providers: [OauthService, GenerateToken],
})
export class OAuthModule { }
