import { Module } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { ExtraController } from './extra.controller';
import { Extra } from './entities/extra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  controllers: [ExtraController],
  providers: [ExtraService],
  exports:[ExtraService]
})
export class ExtraModule {}
