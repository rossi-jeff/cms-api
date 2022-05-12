import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponsePageDto extends BaseModelDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Slug?: string;
}
