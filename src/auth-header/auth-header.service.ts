/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { encode } from '../utils/encode'

@Injectable()
export class AuthHeaderService {
  validateApiKey(apiKey: string) {
    const key = encode(moment().format(process.env.API_KEY_1))
    const apiKeys = [key, process.env.API_KEY_2]
    return apiKeys.find((item: string) => item === apiKey)
  }
}
