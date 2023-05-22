import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as uuid4 from "uuid4"
import { JwtSysGuard } from '../../middlewares/guards';
import { name } from '../../common';
import { validatorsFile } from '../../config'

@ApiSecurity('x-api-key')
@Controller('media')
@ApiTags('media')
@UseGuards(JwtSysGuard)
@ApiBearerAuth(name.JWT)
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
  ) { }
  @Post()
  @ApiOkResponse({ description: 'Upload image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, "") + uuid4()
        const extensions = path.parse(file.originalname).ext
        callback(null, `${filename}${extensions}`)
      },
    })
  }))
  create(
    @UploadedFile(validatorsFile) file: Express.Multer.File
  ) {
    return this.mediaService.create(file)
  }
  //[UPLOAD]:to cloud
  @ApiOkResponse({ description: 'Upload image to cloud' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('cloud')
  @UseInterceptors(FileInterceptor('file'))
  createCloud(
    @UploadedFile(validatorsFile)
    file: Express.Multer.File,
  ) {
    return this.mediaService.createWithCloud(file)
  }
}
