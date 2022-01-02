import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { hashPassword } from '../utils/hashUtils';
import { UserSignUpDto, UserLoginDto } from '../auth/dto';
import { UpdateFcmDto } from '../user/dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async SignUp(authCredentials: UserSignUpDto) {
    const {
      UserName,
      Password,
      Email,
      Type,
      // ProfileImg
    } = authCredentials;

    const user = new User();

    user.UserName = UserName;
    user.Type = Type;
    user.Email = Email;
    //user.ProfileImg = ProfileImg;
    const salt = await bcrypt.genSalt();
    user.Salt = salt;
    user.Password = await hashPassword(Password, salt);

    try {
      await user.save();
      return { Status: 200, Message: 'Profile Created Successfully' };
    } catch (err) {
      // console.log(err);

      if (err.code == 23505) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(loginCredentials: UserLoginDto): Promise<number> {
    const { Email, Password } = loginCredentials;

    const user = await this.findOne({ Email });

    if (user && (await user.validatePassword(Password))) {
      return user.Id;
    } else {
      return null;
    }
  }

  async updateUserFcm(fcmBody: UpdateFcmDto, id) {
    const { FcmToken } = fcmBody;

    try {
      await this.update(id, { FcmToken });
      return { Status: 200, Message: 'FcmToken Updated' };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
