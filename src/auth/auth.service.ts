import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserSignUpDto, UserLoginDto } from './dto';
import { UserRepository } from '../user/user.repository';
import { UserRoles } from 'src/user/user.roles.enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async userSignUp(SignUpDto: UserSignUpDto) {
    return this.userRepository.SignUp(SignUpDto);
  }

  async userLogin(loginBody: UserLoginDto) {
    const id = await this.userRepository.validateUserPassword(loginBody);

    if (!id) {
      throw new UnauthorizedException('Invalid Email Or Password');
    }

    const accessToken = await this.jwtService.sign(id.toString());

    return { Token: accessToken };
  }

  async adminLogin(loginBody: UserLoginDto) {
    const id = await this.userRepository.validateUserPassword(loginBody);

    const user = await this.userRepository.findOne({ Id: id });

    if (user && user.Type !== UserRoles.Admin) {
      throw new UnauthorizedException('Invalid Email Or Password');
    }

    if (!id) {
      throw new UnauthorizedException('Invalid Email Or Password');
    }

    const accessToken = await this.jwtService.sign(id.toString());

    return { Token: accessToken };
  }
}
