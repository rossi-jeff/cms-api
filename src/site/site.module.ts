import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { AuthModule } from '../auth/auth.module';
import { StyleService } from '../style/style.service';
import { Style } from '../style/style.entity';
import { PageService } from '../page/page.service';
import { Page } from '../page/page.entity';
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
      Site,
      Style,
      Page,
      Selector,
      Rule,
      PageRow,
      PageColumn,
      CssClass,
    ]),
    AuthModule,
  ],
  providers: [
    SiteService,
    StyleService,
    PageService,
    SelectorService,
    RuleService,
    RowService,
    ColumnService,
    CssClassService,
  ],
  controllers: [SiteController],
})
export class SiteModule {}
