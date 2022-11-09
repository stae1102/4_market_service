import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/decorators/role.decorator';
import { User } from '../common/decorators/user.decorator';
import { Users } from '../users/schemas/users.schemas';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('register')
  @Role('NORMAL')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async registerSeller(
    @Body() registerSellerDto: RegisterSellerDto,
    @User() user: Users,
  ) {
    return await this.sellersService.registerSeller(
      registerSellerDto,
      user._id,
    );
  }
}
