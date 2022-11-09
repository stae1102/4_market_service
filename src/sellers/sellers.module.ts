import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sellers, SellersSchema } from './schemas/sellers.schema';

@Module({
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
