import { RedisCacheModule, RedisCacheService } from 'src/redis';
import { ExampleController } from './example.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [RedisCacheModule],
    controllers: [
        ExampleController,],
    providers: [RedisCacheService],
})
export class ExampleModule { }
