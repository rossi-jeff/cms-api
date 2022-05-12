import { ApiProperty } from '@nestjs/swagger';
import { BaseModelDto } from './base-model.dto';
import { ResponseCssClassDto } from './response-css-class.dto';

export class ResponseColumnDto extends BaseModelDto {
  @ApiProperty()
  Content?: string;

  @ApiProperty()
  Order?: number;

  @ApiProperty()
  RowId?: number;

  @ApiProperty({ type: [ResponseCssClassDto] })
  CssClasses?: ResponseCssClassDto[];
}
