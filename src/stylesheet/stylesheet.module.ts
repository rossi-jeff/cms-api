import { Module } from '@nestjs/common';
import { StylesheetService } from './stylesheet.service';
import { StylesheetController } from './stylesheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../site/site.entity';
import { Page } from '../page/page.entity';
import { Style } from '../style/style.entity';
import { Selector } from '../selector/selector.entity';
import { Rule } from '../rule/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Site, Page, Style, Selector, Rule])],
  providers: [StylesheetService],
  controllers: [StylesheetController],
})
export class StylesheetModule {}
