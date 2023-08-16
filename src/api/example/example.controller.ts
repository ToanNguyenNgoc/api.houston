/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from 'src/redis';

@ApiTags('example')
@Controller('example')
export class ExampleController {

  constructor(
    private readonly redisCacheSv: RedisCacheService
  ) { }


  @Get('set-cache')
  async setCate() {
    await this.redisCacheSv.set('NEW_CACHE', 'Hello bro!')
    return true
  }

  @Get('get-cache')
  async getCate() {
    const res = await this.redisCacheSv.get('NEW_CACHE')
    return res
  }
  @Get('del-cache')
  async delCate() {
    await this.redisCacheSv.del('NEW_CACHE')
    return
  }
}
