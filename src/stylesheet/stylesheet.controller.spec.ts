import { Test, TestingModule } from '@nestjs/testing';
import { StylesheetController } from './stylesheet.controller';

describe('StylesheetController', () => {
  let controller: StylesheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StylesheetController],
    }).compile();

    controller = module.get<StylesheetController>(StylesheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
