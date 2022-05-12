import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CssClassService } from './css-class.service';
import { CssClass } from './css-class.entity';
import { CssClassController } from './css-class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CssClass])],
  providers: [CssClassService],
  controllers: [CssClassController],
})
export class CssClassModule {}
