import { Controller, Post, Body } from '@nestjs/common';
import {
  RegisterUserDto,
  LoginDto,
  ResponseLoginDto,
  ResponseUserDto,
} from '../global/dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'OK', type: ResponseUserDto })
  async registerUser(@Body() DTO: RegisterUserDto) {
    return await this.service.registerUser(DTO);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'OK', type: ResponseLoginDto })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  async loginUser(@Body() DTO: LoginDto) {
    return await this.service.loginUser(DTO);
  }
}
