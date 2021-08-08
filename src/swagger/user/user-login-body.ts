import { ApiProperty } from '@nestjs/swagger';

export class UserLoginBody {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  Password: string;
}
