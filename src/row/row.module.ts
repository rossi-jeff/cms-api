import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRow } from './row.entity';
import { RowService } from './row.service';
import { ColumnService } from '../column/column.service';
import { PageColumn } from '../column/column.entity';
import { RowController } from './row.controller';
import { AuthModule } from '../auth/auth.module';
import { CssClassService } from '../css-class/css-class.service';
import { CssClass } from '../css-class/css-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageRow, PageColumn, CssClass]),
    AuthModule,
  ],
  providers: [RowService, ColumnService, CssClassService],
  controllers: [RowController],
})
export class RowModule {}
