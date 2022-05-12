import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from './style.entity';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';
import { AuthModule } from '../auth/auth.module';
import { SelectorService } from '../selector/selector.service';
import { Selector } from '../selector/selector.entity';
import { RuleService } from '../rule/rule.service';
import { Rule } from '../rule/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Style, Selector, Rule]), AuthModule],
  providers: [StyleService, SelectorService, RuleService],
  controllers: [StyleController],
})
export class StyleModule {}
