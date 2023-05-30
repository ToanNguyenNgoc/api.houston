/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
// import { User } from '../../typeorm/entities/User';
// import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(

  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    // console.log('Serializer User', user);
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    // console.log('Serializer User payload');
    // console.log(payload)
    done(null, null);
  }
}