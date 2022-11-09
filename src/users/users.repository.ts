import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './schemas/users.schemas';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    return await this.userModel.create(createUserDto);
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.userModel.findOne({
      email,
    });
  }

  async findById(_id: Types.ObjectId): Promise<Users> {
    return await this.userModel.findById({ _id });
  }

  async findByIdAndUpdateToSELLER(_id: Types.ObjectId) {
    return await this.userModel.findByIdAndUpdate(
      _id,
      { $addToSet: { role: 'SELLER' } },
      { new: true },
    );
  }
}
