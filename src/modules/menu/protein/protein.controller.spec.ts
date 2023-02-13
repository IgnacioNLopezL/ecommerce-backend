import { Test, TestingModule } from '@nestjs/testing';
import { ProteinController } from './protein.controller';
import { ProteinService } from './protein.service';

describe('ProteinController', () => {
  let controller: ProteinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProteinController],
      providers: [ProteinService],
    }).compile();

    controller = module.get<ProteinController>(ProteinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
