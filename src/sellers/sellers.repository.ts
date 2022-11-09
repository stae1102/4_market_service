import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sellers } from './schemas/sellers.schema';

@Injectable()
export class SellersRepository {
  constructor(
    @InjectModel(Sellers.name) private readonly sellersModel: Model<Sellers>,
  ) {}

  async create(sellers: Sellers) {
    return await this.sellersModel.create(sellers);
  }
}
