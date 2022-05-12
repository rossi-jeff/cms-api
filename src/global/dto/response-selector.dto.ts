import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponseSelectorDto extends BaseModelDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Order?: number;
}
