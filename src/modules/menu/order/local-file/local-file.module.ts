import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './entities/local-file.entity';
import { LocalFileService } from './local-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  providers: [LocalFileService],
  exports: [LocalFileService],
})
export class LocalFileModule {}
