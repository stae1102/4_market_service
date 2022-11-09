import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Users } from '../../users/schemas/users.schemas';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException({
        message: '이메일 혹은 비밀번호가 맞지 않습니다.',
      });
    }
    return user;
  }
}
