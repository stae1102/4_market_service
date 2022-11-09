import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@User() user) {
    console.log('next');
    return this.authService.signIn(user);
  }
}
