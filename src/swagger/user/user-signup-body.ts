import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpBody {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Email: string;

  @ApiProperty()
  Password: string;

  @ApiProperty()
  Type: number;

  // @ApiProperty()
  // ProfileImg: string;
}
