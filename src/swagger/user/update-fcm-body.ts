import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserFcm {
  @ApiProperty()
  FcmToken: string;
}
