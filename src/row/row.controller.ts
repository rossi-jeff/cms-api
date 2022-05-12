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
import { RowService } from './row.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateColumnDto,
  ResponseColumnDto,
  CreateRowDto,
  ResponseRowDto,
  ResponseCssClassDto,
  CreateCssClassDto,
} from '../global/dto';

@ApiTags('Rows')
@Controller('row')
export class RowController {
  constructor(private service: RowService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRowDto })
  async showRow(@Param('UUID') UUID: string) {
    return await this.service.showRow(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRowDto })
  @UseGuards(AuthGuard('jwt'))
  async updateRow(@Param('UUID') UUID: string, @Body() DTO: CreateRowDto) {
    return await this.service.updateRow(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteRow(@Param('UUID') UUID: string) {
    return await this.service.deleteRow(UUID);
  }

  @Get(':UUID/column')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseColumnDto] })
  async getColumns(@Param('UUID') UUID: string) {
    return await this.service.getColumns(UUID);
  }

  @Post(':UUID/column')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseColumnDto })
  @UseGuards(AuthGuard('jwt'))
  async createColumn(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateColumnDto,
  ) {
    return await this.service.createColumn(UUID, DTO);
  }

  @Get(':UUID/class')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseCssClassDto] })
  async getRowClasses(@Param('UUID') UUID: string) {
    return await this.service.getRowClasses(UUID);
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
