import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty()
  Order?: number;

  @ApiProperty()
  Content?: string;
}
