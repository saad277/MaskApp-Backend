import { Repository, EntityRepository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Media } from '../entities';
import { UploadMediaDto } from './dto';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {
  async createEntry(payload: UploadMediaDto, userId: any) {
    const { Area, Description, Img, Location, WithMask, WithoutMask } = payload;

    const media = new Media();

    const withMaskPercent = (WithMask / WithMask + WithoutMask) * 100;
    const withoutMaskPercent = (WithoutMask / WithMask + WithoutMask) * 100;

    media.UserId = userId;
    media.Area = Area;
    media.Description = Description;
    media.Img = Img;
    media.Location = Location;
    media.WithMask = WithMask;
    media.WithoutMask = WithoutMask;

    if (withMaskPercent > WithoutMask) {
      media.Status = 1;
    } else if (withoutMaskPercent > 75) {
      media.Status = 3; //3 is high
    } else if (withoutMaskPercent < 75 && withoutMaskPercent > 50) {
      media.Status = 2; //2 is medium
    } else if (withoutMaskPercent < 50) {
      media.Status = 1;
    }

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

  async getListing(user: any) {
    try {
      const mediaList = await this.createQueryBuilder('media')
        .where('media.UserId = :id', { id: user.Id })
        .getMany();

      return mediaList;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getAllListing() {
    try {
      const mediaList = await this.createQueryBuilder('media').getMany();

      return {
        Status: 200,
        Data: mediaList,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getMediaDetails(id: any) {
    const media = await this.findOne({ Id: id });

    if (media) {
      return media;
    }
    throw new NotFoundException();
  }

  async statusUpdate(id: any, payload: any) {
    const { Status } = payload;

    const media = await this.findOne({ Id: id });

    if (media) {
      await this.update(id, { Status });
      return { Status: 200, Message: 'Status Updated' };
    }

    throw new NotFoundException();
  }

  async getMediaInDateRange(payload: any) {
    const { StartDate, EndDate } = payload;
    const start = new Date(StartDate);
    let end = new Date(EndDate);
    end.setDate(end.getDate() + 1);
    const result = await this.createQueryBuilder('q')
      .where(
        `q.CreatedAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      //.select(['q.CreatedAt'])
      .getMany();

    return { Data: result, Status: 200 };
  }
}
