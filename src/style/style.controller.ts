import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { StyleService } from './style.service';
import {
  CreateStyleDto,
  ResponseStyleDto,
  CreateSelectorDto,
  ResponseSelectorDto,
  CreateRuleDto,
  ResponseRuleDto,
  SortDto,
} from '../global/dto';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Styles')
@Controller('style')
export class StyleController {
  constructor(private service: StyleService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseStyleDto })
  async showStyle(@Param('UUID') UUID: string) {
    return await this.service.showStyle(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseStyleDto })
  @UseGuards(AuthGuard('jwt'))
  async updateStyle(@Param('UUID') UUID: string, @Body() DTO: CreateStyleDto) {
    return await this.service.updateStyle(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteStyle(@Param('UUID') UUID: string) {
    return await this.service.deleteStyle(UUID);
  }

  @Post(':UUID/selector')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'CREATED',
    type: ResponseSelectorDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async createSelector(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateSelectorDto,
  ) {
    return await this.service.createSelector(UUID, DTO);
  }

  @Post(':UUID/rule')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'CREATED',
    type: ResponseRuleDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async createRule(@Param('UUID') UUID: string, @Body() DTO: CreateRuleDto) {
    return await this.service.createRule(UUID, DTO);
  }

  @Post('sort')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async sortStyles(@Body() DTO: SortDto) {
    return await this.service.sortStyles(DTO);
  }
}
