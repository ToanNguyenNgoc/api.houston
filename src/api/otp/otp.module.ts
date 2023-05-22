/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([OtpEntity])],
    controllers: [],
    providers: [],
})
export class OtpModule { }
