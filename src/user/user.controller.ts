import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserFcm } from '../swagger';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateFcmDto } from './dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserFcm })
  @Post('/update-fcm')
  userSignUp(@GetUser() user, @Body() fcmBody: UpdateFcmDto) {
    return this.userService.updateUserFcm(fcmBody, user.Id);
  }
}
