import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '!maskApp',
    });
  }

  async validate(Id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.Id = :Id', { Id })
      .select([
        'user.Id',
        'user.UserName',
        'user.Email',
        'user.Type',
        'user.ProfileImg',
      ])
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    return user;
  }
}
