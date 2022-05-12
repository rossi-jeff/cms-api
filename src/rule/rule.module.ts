import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './rule.entity';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), AuthModule],
  providers: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
