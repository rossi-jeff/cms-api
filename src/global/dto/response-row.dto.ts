import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';
import { ResponseCssClassDto } from './response-css-class.dto';
import { ResponseColumnDto } from './response-column.dto';

export class ResponseRowDto extends BaseModelDto {
  @ApiProperty()
  Order?: number;

  @ApiProperty()
  PageId?: number;

  @ApiProperty({ type: [ResponseCssClassDto] })
  CssClasses?: ResponseCssClassDto[];

  @ApiProperty({ type: [ResponseColumnDto] })
  Columns?: ResponseColumnDto[];
}
