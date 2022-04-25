import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Database } from 'src/database/database';

@Injectable()
export class UsersService {
  constructor(private readonly DBContext: Database) {}

  async create(dbCode: number, createUserDto: CreateUserDto) {
    const createdUser = await this.DBContext.create(dbCode, createUserDto);
    return createdUser;
  }

  async findAll(dbCode: number) {
    const users = await this.DBContext.getAll(dbCode);
    return users;
  }

  async findOne(dbCode: number, id: number) {
    const user = await this.DBContext.getById(dbCode, id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(dbCode: number, id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.DBContext.update(dbCode, id, updateUserDto);
    return updatedUser;
  }

  async remove(dbCode: number, id: number) {
    await this.DBContext.delete(dbCode, id);
  }
}
