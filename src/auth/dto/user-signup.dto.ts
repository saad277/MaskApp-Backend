import {
  IsString,
  MinLength,
  MaxLength,
  //Matches,
  IsNumber,
  IsEmail,
  IsEnum,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { UserRoles } from '../../user/user.roles.enums';

export class UserSignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  UserName: string;

  @IsEmail()
  Email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'Password Too Weak',
  //   })
  Password: string;

  @IsEnum(UserRoles)
  @IsNumber()
  Type: number;

  // @IsString()
  // ProfileImg: string;
}
