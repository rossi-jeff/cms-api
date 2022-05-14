import { Test, TestingModule } from '@nestjs/testing';
import { StylesheetService } from './stylesheet.service';

describe('StylesheetService', () => {
  let service: StylesheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StylesheetService],
    }).compile();

    service = module.get<StylesheetService>(StylesheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
