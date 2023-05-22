import { SendMailController } from './send-mail.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        SendMailController
    ],
    providers: [],
})
export class SendMailModule { }
