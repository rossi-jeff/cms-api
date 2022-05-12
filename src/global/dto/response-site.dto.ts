import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponseSiteDto extends BaseModelDto {
  @ApiProperty()
  Name?: string;
}
