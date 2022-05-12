import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponseUserDto extends BaseModelDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Email?: string;
}
