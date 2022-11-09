import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersRepository } from '../users/users.repository';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { Sellers } from './schemas/sellers.schema';
import { SellersRepository } from './sellers.repository';

@Injectable()
export class SellersService {
  constructor(
    private readonly sellersRepository: SellersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async registerSeller(
    registerSellerDto: RegisterSellerDto,
    _id: Types.ObjectId,
  ) {
    await this.usersRepository.findByIdAndUpdateToSELLER(_id);
    return await this.sellersRepository.create({
      ...registerSellerDto,
      OwnerId: _id,
    } as Sellers);
  }

  async registerProduct(
    registerProductDto: RegisterProductDto,
    _id: Types.ObjectId,
  ) {}
}
