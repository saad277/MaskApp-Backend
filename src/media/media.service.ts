import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

import { UploadMediaDto } from './dto';
import { MediaRepository } from './media.repository';
import { UserRepository } from '../user/user.repository';

@Injectable({ scope: Scope.REQUEST })
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
    private userRepo: UserRepository,
    private httpService: HttpService,
  ) {}

  uploadMedia(payload: UploadMediaDto, id: number) {
    return this.mediaRepository.createEntry(payload, id);
  }

  mediaListing(user: any) {
    return this.mediaRepository.getListing(user);
  }

  allMediaListing() {
    return this.mediaRepository.getAllListing();
  }

  mediaDetails(id: any) {
    return this.mediaRepository.getMediaDetails(id);
  }

  async statusUpdate(id: any, payload: any) {
    const { UserId } = payload;
    const res = await this.mediaRepository.statusUpdate(id, payload);

    const user = await this.userRepo.findOne({ Id: UserId });

    return { Status: 200, token: user.FcmToken };
  }
}
