import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class MongoClient {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(user: CreateUserDto) {
    return await this.UserModel.create(user);
  }

  async getAll() {
    return await this.UserModel.find();
  }

  async getById(id: number) {
    return await this.UserModel.findById(id);
  }

  async update(id: number, user: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, user);
  }

  async delete(id: number) {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
