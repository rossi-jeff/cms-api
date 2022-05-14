import { ApiProperty } from '@nestjs/swagger';

export class SortDto {
  @ApiProperty({ type: [Number] })
  Sorted?: number[];
}