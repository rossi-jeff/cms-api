import { ApiProperty } from '@nestjs/swagger';
import { ResponsePageDto } from './response-page.dto';
import { ResponseSiteDto } from './response-site.dto';

export class ResponsePageShowDto extends ResponsePageDto {
  @ApiProperty({ type: ResponseSiteDto })
  Site?: ResponseSiteDto;
}
