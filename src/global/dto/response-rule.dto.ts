import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponseRuleDto extends BaseModelDto {
  @ApiProperty()
  Property?: string;

  @ApiProperty()
  Value?: string;

  @ApiProperty()
  Order?: number;
}
