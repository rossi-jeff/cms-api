import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCssClassDto, ResponseCssClassDto } from '../global/dto';
import { CssClassService } from './css-class.service';

@ApiTags('CSS Classes')
@Controller('css-class')
export class CssClassController {
  constructor(private service: CssClassService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseCssClassDto })
  async showCssClass(@Param('UUID') UUID: string) {
    return await this.service.showCssClass(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseCssClassDto })
  @UseGuards(AuthGuard('jwt'))
  async updateCssClass(
    @Param('UUID') UUID: string,
    @Body() DTO: CreateCssClassDto,
  ) {
    return await this.service.updateCssClass(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteCssClass(@Param('UUID') UUID: string) {
    return await this.service.deleteCssClass(UUID);
  }
}
