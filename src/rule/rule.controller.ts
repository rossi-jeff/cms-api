import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateRuleDto, ResponseRuleDto } from '../global/dto';

@ApiTags('Rules')
@Controller('rule')
export class RuleController {
  constructor(private service: RuleService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRuleDto })
  async showRule(@Param('UUID') UUID: string) {
    return this.service.showRule(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRuleDto })
  @UseGuards(AuthGuard('jwt'))
  async updateRule(@Param('UUID') UUID: string, @Body() DTO: CreateRuleDto) {
    return await this.service.updateRule(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteRule(@Param('UUID') UUID: string) {
    return await this.service.deleteRule(UUID);
  }
}
