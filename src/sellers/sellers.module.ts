import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sellers, SellersSchema } from './schemas/sellers.schema';
import { SellersRepository } from './sellers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sellers.name, schema: SellersSchema }]),
  ],
  controllers: [SellersController],
  providers: [SellersService, SellersRepository],
})
export class SellersModule {}
