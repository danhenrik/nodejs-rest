import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserPG } from '../users/entities/user.entity';

@Injectable()
export class PostgresClient {
  constructor(
    @InjectRepository(UserPG) private UserModel: Repository<UserPG>,
  ) {}

  async create(user: CreateUserDto) {
    return await this.UserModel.createQueryBuilder()
      .insert()
      .into(UserPG)
      .values(user)
      .execute();
  }

  async getAll() {
    return await this.UserModel.createQueryBuilder().getMany();
  }

  async getById(id: number) {
    return await this.UserModel.createQueryBuilder('user')
      .where('id=:id', { id })
      .getOne();
  }

  async update(id: number, user: UpdateUserDto) {
    return await this.UserModel.createQueryBuilder()
      .update(UserPG)
      .set(user)
      .where('id=:id', { id })
      .execute();
  }

  async delete(id: number) {
    return await this.UserModel.createQueryBuilder()
      .delete()
      .from(UserPG)
      .where('id=:id', { id })
      .execute();
  }
}
