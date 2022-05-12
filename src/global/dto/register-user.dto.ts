import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Email?: string;

  @ApiProperty()
  PassWord?: string;
}
