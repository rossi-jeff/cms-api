import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';

export class ResponseCssClassDto extends BaseModelDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  Order?: number;

  @ApiProperty()
  RowId?: number;

  @ApiProperty()
  ColumnId?: number;
}
