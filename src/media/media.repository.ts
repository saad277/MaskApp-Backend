import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Media } from '../entities';
import { UploadMediaDto } from './dto';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {
  async createEntry(payload: UploadMediaDto, userId) {
    const { Area, Description, Img, Location, WithMask, WithoutMask } = payload;

    const media = new Media();

    media.UserId = userId;
    media.Area = Area;
    media.Description = Description;
    media.Img = Img;
    media.Location = Location;
    media.WithMask = WithMask;
    media.WithoutMask = WithoutMask;

    try {
      await media.save();

      return {
        Status: 200,
        Message: 'Media Uploaded Successfully',
        Data: media,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getListing(user) {
    try {
      const mediaList = await this.createQueryBuilder('media')
        .where('media.UserId = :id', { id: user.Id })
        .getMany();

      return mediaList;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
