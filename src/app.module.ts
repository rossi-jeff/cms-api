import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { PageModule } from './page/page.module';
import { StyleModule } from './style/style.module';
import { SelectorModule } from './selector/selector.module';
import { RuleModule } from './rule/rule.module';
import { RowModule } from './row/row.module';
import { ColumnModule } from './column/column.module';
import { AuthModule } from './auth/auth.module';
import { CssClassModule } from './css-class/css-class.module';
import { StylesheetModule } from './stylesheet/stylesheet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SiteModule,
    PageModule,
    StyleModule,
    SelectorModule,
    RuleModule,
    RowModule,
    ColumnModule,
    AuthModule,
    CssClassModule,
    StylesheetModule,
  ],
})
export class AppModule {}
