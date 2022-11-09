import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersRepository } from '../users/users.repository';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Products } from './schemas/products.schemas';
import { Sellers } from './schemas/sellers.schema';
import { SellersRepository } from './sellers.repository';

@Injectable()
export class SellersService {
  constructor(
    private readonly sellersRepository: SellersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async registerSeller(
    registerSellerDto: RegisterSellerDto,
    _id: Types.ObjectId,
  ) {
    await this.usersRepository.findByIdAndUpdateToSELLER(_id);
    return await this.sellersRepository.create({
      ...registerSellerDto,
      OwnerId: _id,
    } as Sellers);
  }

  async registerProduct(
    registerProductDto: RegisterProductDto,
    _id: Types.ObjectId,
  ) {
    // 1. 셀러 id 추출
    const seller = await this.usersRepository.findById(_id);
    const SellerId = seller._id;

    // 2. 상품 등록과 함께 셀러 id 저장
    return await this.productsRepository.create({
      ...registerProductDto,
      SellerId,
    } as Products);
  }

  async updateProduct(
    productId: Types.ObjectId,
    updateProductDto: UpdateProductDto,
    _id: Types.ObjectId,
  ) {
    const seller = await this.usersRepository.findById(_id);
    const product = await this.productsRepository.findById(productId);
    const SellerId = seller._id.toString();
    const productOwnerId = product.SellerId.toString();

    if (SellerId !== productOwnerId) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['해당 셀러의 상품이 아닙니다.'],
      });
    }

    return await this.productsRepository.findByIdAndUpdate(
      productId,
      updateProductDto,
    );
  }
}
