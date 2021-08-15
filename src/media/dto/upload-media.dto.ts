import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsEnum,
  IsObject,
  IsBoolean,
} from 'class-validator';

export class UploadMediaDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  Description: string;

  @IsObject()
  Location: object;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  Area: string;

  @IsNumber()
  WithMask: number;

  @IsNumber()
  WithoutMask: number;

  @IsString()
  Img: string;
}
