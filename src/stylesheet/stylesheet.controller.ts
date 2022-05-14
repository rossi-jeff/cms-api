import { Controller, Get, Param } from '@nestjs/common';
import { StylesheetService } from './stylesheet.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Stylesheets')
@Controller('stylesheet')
export class StylesheetController {
  constructor(private service: StylesheetService) {}

  @Get('page/:UUID')
  @ApiResponse({ status: 200, description: 'OK', type: String })
  async getPageStyleSheet(@Param('UUID') UUID: string) {
    return await this.service.getPageStyleSheet(UUID)
  }

  @Get('site/:UUID')
  @ApiResponse({ status: 200, description: 'OK', type: String })
  async getSiteStyleSheet(@Param('UUID') UUID: string) {
    return await this.service.getSiteStyleSheet(UUID)
  }
}
