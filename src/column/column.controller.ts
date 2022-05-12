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
import { ColumnService } from './column.service';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateColumnDto,
  ResponseColumnDto,
  ResponseCssClassDto,
  CreateCssClassDto,
} from '../global/dto';

@ApiTags('Columns')
@Controller('column')
export class ColumnController {
  constructor(private service: ColumnService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseColumnDto })
  async showColumn(@Param('UUID') UUID: string) {
    return await this.service.showColumn(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseColumnDto })
  @UseGuards(AuthGuard('jwt'))
  async updateColumn(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateColumnDto,
  ) {
    return await this.service.updateColumn(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteColumn(@Param('UUID') UUID: string) {
    return await this.service.deleteColumn(UUID);
  }

  @Get(':UUID/class')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseCssClassDto] })
  async getColumnClasses(@Param('UUID') UUID: string) {
    return await this.service.getColumnClasses(UUID);
  }

  @Post(':UUID/class')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseCssClassDto })
  @UseGuards(AuthGuard('jwt'))
  async createCssClass(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateCssClassDto,
  ) {
    return await this.service.createCssClass(UUID, DTO);
  }
}
