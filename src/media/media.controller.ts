import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MediaService } from './media.service';
import { UploadMediaDto } from './dto';
import { MediaUploadBody } from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/role-auth.decorator';
import { UserRoles } from 'src/user/user.roles.enums';
import { GetUser } from 'src/decorators/get-user.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @ApiBody({ type: MediaUploadBody })
  @Roles(UserRoles.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/upload')
  uploadMedia(@Body() payload: UploadMediaDto, @GetUser() user) {
    return this.mediaService.uploadMedia(payload, user.Id);
  }
}