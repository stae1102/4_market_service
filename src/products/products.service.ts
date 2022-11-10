import { Injectable } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { ProductsRepository } from '../sellers/products.repository';
import SortType from './enums/sortType.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(query) {
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

    const whereQuery = [];
    if (category) {
      whereQuery.push({ category: { $in: category } });
    } else {
      whereQuery.push({});
    }
    if (nation) {
      whereQuery.push({ nation: { $in: nation } });
    } else {
      whereQuery.push({});
    }

    return await this.productsRepository.findMany(whereQuery, sortQuery, page);
  }
}
