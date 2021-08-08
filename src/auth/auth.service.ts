import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserSignUpDto } from './dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async userSignUp(SignUpDto: UserSignUpDto) {
    return this.userRepository.SignUp(SignUpDto);
  }
}
