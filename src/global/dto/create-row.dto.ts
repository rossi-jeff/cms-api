import { ApiProperty } from '@nestjs/swagger';

export class CreateRowDto {
  @ApiProperty()
  Order?: number;
}
