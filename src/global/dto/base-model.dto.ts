import { ApiProperty } from '@nestjs/swagger';

export class BaseModelDto {
  @ApiProperty()
  Id?: number;

  @ApiProperty()
  UUID?: string;

  @ApiProperty()
  Created?: string;

  @ApiProperty()
  Updated?: string;

  @ApiProperty()
  Version?: number;
}
