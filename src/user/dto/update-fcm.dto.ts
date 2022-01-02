import { IsString } from 'class-validator';

export class UpdateFcmDto {
  @IsString()
  FcmToken: string;
}
