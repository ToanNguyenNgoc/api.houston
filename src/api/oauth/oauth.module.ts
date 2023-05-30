

import { Module } from '@nestjs/common';
import { OAuthController } from 'src/api/oauth/oauth.controller';

@Module({
    imports: [],
    controllers: [OAuthController],
    providers: [],
})
export class OAuthModule { }
