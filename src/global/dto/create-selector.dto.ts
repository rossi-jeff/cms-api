import { ApiProperty } from '@nestjs/swagger';

export class CreateSelectorDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Order?: number;
}
