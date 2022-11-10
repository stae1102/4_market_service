import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findMany(query, sortQuery, page) {
    return await this.productsModel
      .find({ ...query }, { name: true }, { take: 10, skip: page })
      .sort(sortQuery);
  }
}
