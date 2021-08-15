import { ApiProperty } from '@nestjs/swagger';

export class MediaUploadBody {
  @ApiProperty()
  Description: string;

  @ApiProperty()
  Location: object;

  @ApiProperty()
  Area: string;

  @ApiProperty()
  WithMask: number;

  @ApiProperty()
  WithoutMask: number;

  @ApiProperty()
  Img: string;
}
