import { ApiProperty } from '@nestjs/swagger';

export class CreateRuleDto {
  @ApiProperty()
  Property?: string;

  @ApiProperty()
  Value?: string;

  @ApiProperty()
  Order?: number;
}
