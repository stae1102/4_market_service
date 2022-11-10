import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder, Types } from 'mongoose';
import { PAGE_CONTENTS } from '../common/constants';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './schemas/products.schemas';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}

  async create(products: Products) {
    return await this.productsModel.create(products);
  }

  async findById(_id: Types.ObjectId) {
    return await this.productsModel.findById({ _id });
  }

  async findByIdAndUpdate(
    _id: Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    return await this.productsModel.findByIdAndUpdate(_id, {
      ...updateProductDto,
    });
  }

  async delete(_id: Types.ObjectId) {
    return await this.productsModel.findOneAndUpdate(_id, {
      deletedAt: new Date(),
    });
  }

  async findMany(
    whereQuery: FilterQuery<Products>[],
    sortQuery: { [key: string]: SortOrder },
    page: number,
  ): Promise<Products[]> {
    return await this.productsModel
      .find(
        {
          $and: whereQuery,
        },
        {
          name: true,
          description: true,
          price: true,
          category: true,
          nation: true,
          orderDeadline: true,
        },
        { take: PAGE_CONTENTS, skip: PAGE_CONTENTS * (page - 1) },
      )
      .sort(sortQuery);
  }
}
