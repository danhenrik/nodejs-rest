import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { MongoClient } from './mongo-client';
import { PostgresClient } from './postgres-client';

@Injectable()
export class Database {
  constructor(
    private readonly postgresClient: PostgresClient,
    private readonly mongoClient: MongoClient,
  ) {}

  private pickDatabase(dbCode: number) {
    if (dbCode == 0) return this.postgresClient;
    if (dbCode == 1) return this.mongoClient;
    throw new Error("'db' query params should be either 0 or 1");
  }

  async create(dbCode: number, user: CreateUserDto) {
    const dbClient = this.pickDatabase(dbCode);
    const response = await dbClient.create(user);
    return response;
  }

  async getAll(dbCode: number) {
    const dbClient = this.pickDatabase(dbCode);
    const response = await dbClient.getAll();
    return response;
  }

  async getById(dbCode: number, id: number) {
    const dbClient = this.pickDatabase(dbCode);
    const response = await dbClient.getById(id);
    return response;
  }

  async update(dbCode: number, id: number, user: UpdateUserDto) {
    const dbClient = this.pickDatabase(dbCode);
    const response = await dbClient.update(id, user);
    return response;
  }

  async delete(dbCode: number, id: number) {
    const dbClient = this.pickDatabase(dbCode);
    const response = await dbClient.delete(id);
    return response;
  }
}
