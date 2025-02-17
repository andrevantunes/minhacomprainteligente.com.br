import { Test, TestingModule } from '@nestjs/testing';
import { ReceivablesController } from './receivables.controller';
import { ReceivablesService } from './receivables.service';

describe('PagesController', () => {
  let controller: ReceivablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivablesController],
      providers: [ReceivablesService],
    }).compile();

    controller = module.get<ReceivablesController>(ReceivablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
