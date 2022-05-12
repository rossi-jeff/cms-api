import { ApiProperty } from '@nestjs/swagger';

export class CreateCssClassDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Order?: number;
}
