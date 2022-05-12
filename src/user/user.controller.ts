import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto, ResponseUserDto } from '../global/dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  async showUser(@Param('UUID') UUID: string) {
    return await this.service.showUser(UUID);
  }

  @Patch(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('UUID') UUID: string, @Body() DTO: UpdateUserDto) {
    return await this.service.updateUser(UUID, DTO);
  }

  @Delete(':UUID')
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'NO CONTENT' })
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('UUID') UUID: string) {
    return await this.service.deleteUser(UUID);
  }
}
