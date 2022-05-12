import { Test, TestingModule } from '@nestjs/testing';
import { SelectorService } from './selector.service';

describe('SelectorService', () => {
  let service: SelectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectorService],
    }).compile();

    service = module.get<SelectorService>(SelectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
