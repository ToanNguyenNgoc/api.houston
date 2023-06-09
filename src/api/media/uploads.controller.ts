/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { of } from 'rxjs';


@ApiExcludeController()
@Controller('uploads')
export class UploadsController {
  @Get(":imagename")
  getImageByName(@Param("imagename") imagename: string, @Res() res: Response) {
    return of(res.sendFile(join(process.cwd(), '/uploads/' + imagename)))
  }
}
