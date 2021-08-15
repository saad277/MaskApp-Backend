import { Injectable, Scope } from '@nestjs/common';

import { UploadMediaDto } from './dto';

@Injectable({ scope: Scope.REQUEST })
export class MediaService {
  constructor() {}

  uploadMedia(payload: UploadMediaDto, id: number) {
    console.log(payload, id);
  }
}
