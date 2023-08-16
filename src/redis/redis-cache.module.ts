import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis-cache.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { name } from 'src/common';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                isGlobal: true,
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                password: configService.get('REDIS_PASSWORD'),
                ttl: name.REDIS_TTL
            })
        })
    ],
    controllers: [],
    providers: [RedisCacheService],
    exports: [RedisCacheService, CacheModule]
})
export class RedisCacheModule { }
