import { Test, TestingModule } from '@nestjs/testing';
import { SelectorController } from './selector.controller';

describe('SelectorController', () => {
  let controller: SelectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectorController],
    }).compile();

    controller = module.get<SelectorController>(SelectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
