import { Module } from '@nestjs/common';
import { ProteinService } from './protein.service';
import { ProteinController } from './protein.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protein } from './entities/protein.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Protein])],
  controllers: [ProteinController],
  providers: [ProteinService],
  exports:[ProteinService]
})
export class ProteinModule {}
