import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import LocalFile from './entities/local-file.entity';

@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {}
  async saveLocalFileData(fileData: CreateLocalFileDto) {
    const newFile = this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    console.log(newFile)
    return newFile;
  }
  async getFileById(fileId: number) {
    const file = await this.localFilesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
export default LocalFileService;
