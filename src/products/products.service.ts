import { Injectable } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { ProductsRepository } from '../sellers/products.repository';
import SortType from './enums/sortType.enum';
import { InquiryQuery } from './types/query.type';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(query: InquiryQuery) {
    const { page, sortType, category, nation, inputText } = query;
    let sortQuery: { [key: string]: SortOrder };

    switch (sortType) {
      case SortType.RECENT:
        sortQuery = { createdAt: 'desc' };
        break;
      case SortType.ORDERDEADLINE_DESC:
        sortQuery = { orderDeadline: 'desc' };
        break;
    }

    const whereQuery = [{}];
    if (category) {
      whereQuery.push({ category: { $in: category } });
    }
    if (nation) {
      whereQuery.push({ nation: { $in: nation } });
    }
    if (inputText) {
      whereQuery.push({ $text: { $search: inputText } });
    }

    return await this.productsRepository.findMany(whereQuery, sortQuery, page);
  }
}
