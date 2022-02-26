import { ApiProperty } from '@nestjs/swagger';

export class RangeMediaBody {
  @ApiProperty()
  StartDate: string;

  @ApiProperty()
  EndDate: string;
}
