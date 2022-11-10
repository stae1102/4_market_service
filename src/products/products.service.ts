import { Injectable } from '@nestjs/common';
import { InquiryQuery } from './interfaces/query.interface';

@Injectable()
export class ProductsService {
  async getProducts(query: InquiryQuery) {}
}
