import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteDto {
  @ApiProperty()
  Name?: string;
}
