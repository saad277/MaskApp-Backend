import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UpdateFcmDto } from './dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async updateUserFcm(fcmBody: UpdateFcmDto, id: number) {
    return this.userRepository.updateUserFcm(fcmBody, id);
  }
}
