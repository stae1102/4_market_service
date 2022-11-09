import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../user/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/users.schemas';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['존재하지 않는 사용자입니다'],
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const { password, ...userWithOutPassword } = user.toObject();
      return userWithOutPassword;
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['이메일 혹은 비밀번호가 일치하지 않습니다.'],
      });
    }
  }

  async signIn(user: User) {
    const payload = { email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
