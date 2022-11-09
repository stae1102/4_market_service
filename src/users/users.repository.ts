import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findById(id: string): Promise<Users> {
    return await this.userModel.findById({ _id: id });
  }
}
