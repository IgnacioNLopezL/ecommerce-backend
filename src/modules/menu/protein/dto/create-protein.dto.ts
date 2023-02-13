import { OmitType } from '@nestjs/swagger'
import { Protein } from '../entities/protein.entity';

export class CreateProteinDto extends OmitType(Protein, ['id']) {}
