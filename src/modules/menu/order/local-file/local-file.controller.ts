import {
    Controller,
    Get,
    Param,
    UseInterceptors,
    ClassSerializerInterceptor,
    StreamableFile,
    Res,
    ParseIntPipe,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { createReadStream } from 'fs';
  import { join } from 'path';
import LocalFileService from './local-file.service';
   
  @Controller('local-files')
  @UseInterceptors(ClassSerializerInterceptor)
  export default class LocalFilesController {
    constructor(
      private readonly localFilesService: LocalFileService
    ) {}
   
    @Get(':id')
    async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
      const file = await this.localFilesService.getFileById(id);
   
      const stream = createReadStream(join(process.cwd(), file.path));
   
      response.set({
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Content-Type': file.mimetype
      })
      return new StreamableFile(stream);
    }
  }