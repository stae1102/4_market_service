import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signUp(createUserDto);
  }
}
