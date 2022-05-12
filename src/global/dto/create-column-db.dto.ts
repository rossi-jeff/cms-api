import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';

export class CreateColumnDbDto extends CreateColumnDto {
  @ApiProperty()
  RowId?: number;
}
