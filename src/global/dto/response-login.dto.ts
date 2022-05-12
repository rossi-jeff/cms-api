import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty()
  UUID?: string;

  @ApiProperty()
  Token?: string;
}
