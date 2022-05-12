import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Slug?: string;
}
