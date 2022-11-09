import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 12;
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    const isExist = await this.usersRepository.findByEmail(createUserDto.email);
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['이미 등록된 사용자입니다.'],
      });
    }

    const { email, password, userType } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      userType,
    });
    return user.protectedData;
  }
}
