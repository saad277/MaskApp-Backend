import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  Email: string;

  @IsString()
  Password: string;
}
