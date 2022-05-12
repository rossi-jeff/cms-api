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
import { PageService } from './page.service';
import {
  CreatePageDto,
  ResponsePageDto,
  CreateStyleDto,
  ResponseStyleDto,
  CreateRowDto,
  ResponseRowDto,
  ResponsePageShowDto,
} from '../global/dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Pages')
@Controller('page')
export class PageController {
  constructor(private service: PageService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponsePageShowDto })
  async showPage(@Param('UUID') UUID: string) {
    return await this.service.showPage(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponsePageDto })
  @UseGuards(AuthGuard('jwt'))
  async updatePage(@Param('UUID') UUID: string, @Body() DTO: CreatePageDto) {
    return await this.service.updatePage(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deletePage(@Param('UUID') UUID: string) {
    return await this.service.deletePage(UUID);
  }

  @Get(':UUID/style')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseStyleDto] })
  async getStyles(@Param('UUID') UUID: string) {
    return await this.service.getStyles(UUID);
  }

  @Post(':UUID/style')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'CREATED', type: ResponseStyleDto })
  @UseGuards(AuthGuard('jwt'))
  async createStyle(@Param('UUID') UUID: string, @Body() DTO: CreateStyleDto) {
    return await this.service.createStyle(UUID, DTO);
  }

  @Get(':UUID/row')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseRowDto] })
  async getRows(@Param('UUID') UUID: string) {
    return await this.service.getRows(UUID);
  }

  @Post(':UUID/row')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'CREATED', type: ResponseRowDto })
  @UseGuards(AuthGuard('jwt'))
  async createRow(@Param('UUID') UUID: string, @Body() DTO: CreateRowDto) {
    return await this.service.createRow(UUID, DTO);
  }
}
