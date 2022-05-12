import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { AuthModule } from '../auth/auth.module';
import { StyleService } from '../style/style.service';
import { Style } from '../style/style.entity';
import { SelectorService } from '../selector/selector.service';
import { Selector } from '../selector/selector.entity';
import { RuleService } from '../rule/rule.service';
import { Rule } from '../rule/rule.entity';
import { RowService } from '../row/row.service';
import { PageRow } from '../row/row.entity';
import { ColumnService } from '../column/column.service';
import { PageColumn } from '../column/column.entity';
import { CssClassService } from '../css-class/css-class.service';
import { CssClass } from '../css-class/css-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Page,
      Style,
      Selector,
      Rule,
      PageRow,
      PageColumn,
      CssClass,
    ]),
    AuthModule,
  ],
  providers: [
    PageService,
    StyleService,
    SelectorService,
    RuleService,
    RowService,
    ColumnService,
    CssClassService,
  ],
  controllers: [PageController],
})
export class PageModule {}
