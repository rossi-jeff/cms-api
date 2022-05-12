import { ApiProperty } from '@nestjs/swagger';
import { CreateCssClassDto } from './create-css-class.dto';

export class CreateCssClassDbDto extends CreateCssClassDto {
  @ApiProperty()
  RowId?: number;

  @ApiProperty()
  ColumnId?: number;
}
