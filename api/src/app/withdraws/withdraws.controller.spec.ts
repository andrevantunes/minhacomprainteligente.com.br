import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawsController } from './withdraws.controller';
import { WithdrawsService } from './withdraws.service';

describe('PagesController', () => {
  let controller: WithdrawsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WithdrawsController],
      providers: [WithdrawsService],
    }).compile();

    controller = module.get<WithdrawsController>(WithdrawsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
