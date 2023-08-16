/*
https://docs.nestjs.com/providers#services
*/

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import Cache from 'cache-manager'

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  async set<T>(key: string, value: T) {
    return await this.cacheManager.set(key, value)
  }
  async get(key: string) {
    return await this.cacheManager.get(key)
  }
  async del(key: string) {
    return await this.cacheManager.del(key)
  }
}
