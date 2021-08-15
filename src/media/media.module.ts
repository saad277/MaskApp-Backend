import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
