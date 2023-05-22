import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        RevenueController,],
    providers: [
        RevenueService,],
})
export class RevenueModule { }
