import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { Sellers } from './schemas/sellers.schema';
import { SellersRepository } from './sellers.repository';

@Injectable()
export class SellersService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async registerSeller(
    registerSellerDto: RegisterSellerDto,
    _id: Types.ObjectId,
  ) {
    return await this.sellersRepository.create({
      ...registerSellerDto,
      OwnerId: _id,
    } as Sellers);
  }
}
