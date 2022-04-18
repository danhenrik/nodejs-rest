import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  // constructor(private usersRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return User.create(createUserDto).save();
  }

  findAll() {
    return User.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
