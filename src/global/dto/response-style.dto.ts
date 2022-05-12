import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';
import { ResponseRuleDto } from './response-rule.dto';
import { ResponseSelectorDto } from './response-selector.dto';

export class ResponseStyleDto extends BaseModelDto {
  @ApiProperty()
  Order?: number;

  @ApiProperty()
  PageId?: number;

  @ApiProperty()
  SiteId?: number;

  @ApiProperty({ type: [ResponseSelectorDto] })
  Selectors?: ResponseSelectorDto[];

  @ApiProperty({ type: [ResponseRuleDto] })
  Rules?: ResponseRuleDto[];
}
