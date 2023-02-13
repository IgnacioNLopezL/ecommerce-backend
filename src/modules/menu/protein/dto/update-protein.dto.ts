import { PartialType } from '@nestjs/swagger';
import { CreateProteinDto } from './create-protein.dto';

export class UpdateProteinDto extends PartialType(CreateProteinDto) {}
