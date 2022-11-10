import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../sellers/products.repository';
import SortType from './enums/sortType.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(query) {
    const { page, sortType, category, nation, inputText } = query;
    let sortQuery: object;

    switch (sortType) {
      case SortType.RECENT:
        sortQuery = { createdAt: 'DESC' };
        break;
      case SortType.ORDERDEADLINE_DESC:
        sortQuery = { orderDeadline: 'DESC' };
        break;
    }
    return await this.productsRepository.findMany(
      { category, nation },
      sortQuery,
      page,
    );
  }
}
