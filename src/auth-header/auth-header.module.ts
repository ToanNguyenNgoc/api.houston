import { AuthHeaderService } from './auth-header.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { ApiKeyStrategy } from '../middlewares/strategy';

@Module({
    imports: [PassportModule],
    controllers: [],
    providers: [
        AuthHeaderService,
        // ApiKeyStrategy
    ],
})
export class AuthHeaderModule { }
