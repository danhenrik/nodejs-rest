import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Database } from 'src/database/database';

@Injectable()
export class UsersService {
  // TODO: Since the repo is now static, inject it just like it was before

  // TODO: Have a closer look at how to implement this using multiple databases
  // First idea would be to diferentiate via url query choosing the connecation
  // using the getConnection from typeorm directly, going arround NestJS stuff,
  // but that sounds not right.
  /*
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  */
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
