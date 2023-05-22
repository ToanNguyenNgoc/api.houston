/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    controllers: [],
    providers: [],
})
export class RefreshTokenModule { }
