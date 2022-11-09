import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sellers, SellersSchema } from './schemas/sellers.schema';
import { SellersRepository } from './sellers.repository';
import { UsersModule } from '../users/users.module';
import { Products, ProductsSchema } from './schemas/products.schemas';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sellers.name, schema: SellersSchema },
      { name: Products.name, schema: ProductsSchema },
    ]),
    UsersModule,
  ],
  controllers: [SellersController],
  providers: [SellersService, SellersRepository, ProductsRepository],
})
export class SellersModule {}
