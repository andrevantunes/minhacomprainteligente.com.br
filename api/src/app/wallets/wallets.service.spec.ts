import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';

describe('PagesService', () => {
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsService],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
