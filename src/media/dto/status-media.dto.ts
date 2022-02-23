import { IsNumber } from 'class-validator';

export class StatusMediaDto {
  @IsNumber()
  Status: number;
  
  @IsNumber()
  UserId: number;
}
