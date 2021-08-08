import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserSignUpBody, UserLoginBody } from '../swagger';
import { UserLoginDto, UserSignUpDto } from './dto';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: UserSignUpBody })
  @Post('/signUp')
  userSignUp(@Body() SignUpDto: UserSignUpDto) {
    return this.authService.userSignUp(SignUpDto);
  }

  @ApiBody({ type: UserLoginBody })
  @Post('/user/login')
  userLogin(@Body() loginCredentials: UserLoginDto) {
    return this.authService.userLogin(loginCredentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/me')
  getMe(@GetUser() user) {
    return user;
  }
}
