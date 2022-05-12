import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Selector } from './selector.entity';
import { SelectorService } from './selector.service';
import { SelectorController } from './selector.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Selector]), AuthModule],
  providers: [SelectorService],
  controllers: [SelectorController],
})
export class SelectorModule {}
