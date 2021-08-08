import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserSignUpBody } from '../swagger';
import { UserLoginDto, UserSignUpDto } from './dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: UserSignUpBody })
  @Post('/signUp')
  userSignUp(@Body() authCredentailsDto: UserSignUpDto) {
    return { Success: 200 };
  }
}
