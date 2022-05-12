import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageColumn } from './column.entity';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { CssClassService } from '../css-class/css-class.service';
import { CssClass } from '../css-class/css-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PageColumn, CssClass])],
  providers: [ColumnService, CssClassService],
  controllers: [ColumnController],
})
export class ColumnModule {}
