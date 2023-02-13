import { OmitType } from '@nestjs/swagger'
import { Extra } from '../entities/extra.entity';

export class CreateExtraDto extends OmitType(Extra, ['id']) {}
