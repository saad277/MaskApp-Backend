import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { MediaController } from './media.controller';
import { UserRepository } from '../user/user.repository';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaRepository, UserRepository]),
    HttpModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
