import { Test, TestingModule } from '@nestjs/testing';
import { CssClassController } from './css-class.controller';

describe('CssClassController', () => {
  let controller: CssClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CssClassController],
    }).compile();

    controller = module.get<CssClassController>(CssClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
