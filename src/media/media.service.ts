import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UploadMediaDto } from './dto';
import { MediaRepository } from './media.repository';

@Injectable({ scope: Scope.REQUEST })
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) {}

  uploadMedia(payload: UploadMediaDto, id: number) {
    return this.mediaRepository.createEntry(payload, id);
  }

  mediaListing(user) {
    return this.mediaRepository.getListing(user);
  }

  allMediaListing() {
    return this.mediaRepository.getAllListing();
  }
}
