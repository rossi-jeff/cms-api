import { ApiProperty } from '@nestjs/swagger';

export class CreateStyleDto {
  @ApiProperty()
  Order?: number;
}
