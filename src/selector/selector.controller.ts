import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SelectorService } from './selector.service';
import { CreateSelectorDto, ResponseSelectorDto } from '../global/dto';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Selectors')
@Controller('selector')
export class SelectorController {
  constructor(private service: SelectorService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseSelectorDto })
  async showSelector(@Param('UUID') UUID: string) {
    return await this.service.showSelector(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseSelectorDto })
  @UseGuards(AuthGuard('jwt'))
  async updateSelector(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateSelectorDto,
  ) {
    return await this.service.updateSelector(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteSelector(@Param('UUID') UUID: string) {
    return await this.service.deleteSelector(UUID);
  }
}
