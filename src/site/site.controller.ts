import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  CreateSiteDto,
  ResponseSiteDto,
  CreateStyleDto,
  ResponseStyleDto,
  CreatePageDto,
  ResponsePageDto,
} from '../global/dto';
import { SiteService } from './site.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Sites')
@Controller('site')
export class SiteController {
  constructor(private service: SiteService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseSiteDto] })
  @UseGuards(AuthGuard('jwt'))
  async getSites(@Req() req: any) {
    return await this.service.getSites(req.user.Id);
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseSiteDto })
  async showSite(@Param('UUID') UUID: string) {
    return await this.service.showSite(UUID);
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'CREATED', type: ResponseSiteDto })
  @UseGuards(AuthGuard('jwt'))
  async createSite(@Body() DTO: CreateSiteDto, @Req() req: any) {
    return await this.service.createSite(DTO, req.user.Id);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseSiteDto })
  @UseGuards(AuthGuard('jwt'))
  async updateSite(@Param('UUID') UUID: string, @Body() DTO: CreateSiteDto) {
    return await this.service.updateSite(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteSite(@Param('UUID') UUID: string) {
    return await this.service.deleteSite(UUID);
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

  @Get(':UUID/page')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponsePageDto] })
  async getPages(@Param('UUID') UUID: string) {
    return await this.service.getPages(UUID);
  }

  @Post(':UUID/page')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'CREATED', type: ResponsePageDto })
  @UseGuards(AuthGuard('jwt'))
  async createPage(@Param('UUID') UUID: string, @Body() DTO: CreatePageDto) {
    return await this.service.createPage(UUID, DTO);
  }
}
