import { OmitType } from '@nestjs/swagger'
import LocalFile from '../entities/local-file.entity';

export class CreateLocalFileDto extends OmitType(LocalFile, ['id']) {}
