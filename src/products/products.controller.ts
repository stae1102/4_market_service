import { Controller, Get, Query } from '@nestjs/common';
import { InquiryQuery } from './interfaces/query.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: InquiryQuery) {
    return this.productsService.getProducts(query);
  }
}