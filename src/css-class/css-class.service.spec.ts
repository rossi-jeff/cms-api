import { Test, TestingModule } from '@nestjs/testing';
import { CssClassService } from './css-class.service';

describe('CssClassService', () => {
  let service: CssClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CssClassService],
    }).compile();

    service = module.get<CssClassService>(CssClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
