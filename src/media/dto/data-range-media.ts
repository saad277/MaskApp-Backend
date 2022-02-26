import { IsString } from 'class-validator';

export class DateRangeMediaDto {
  @IsString()
  StartDate: String;

  @IsString()
  EndDate: String;
}
