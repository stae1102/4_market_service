import { Controller, Get, Param, Query } from '@nestjs/common';
import { InquiryQuery } from './types/query.type';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: InquiryQuery) {
    return await this.productsService.getProducts(query);
  }

  @Get(':productId')
  async getSpecificProduct(@Param('productId') productId: Types.ObjectId) {
    return await this.productsService.getSpecificProduct(productId);
  }
}
