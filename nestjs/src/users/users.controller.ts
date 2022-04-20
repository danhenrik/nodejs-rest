import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('') // determine which path this controller is for ('/' in this case)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Query('db') dbIndex: string,
  ) {
    await this.usersService.create(+dbIndex, createUserDto);
  }

  @Get()
  async findAll(@Query('db') dbIndex: string) {
    return await this.usersService.findAll(+dbIndex);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('db') dbIndex: string) {
    return await this.usersService.findOne(+dbIndex, +id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Query('db') dbIndex: string,
  ) {
    return await this.usersService.update(+dbIndex, +id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('db') dbIndex: string) {
    return await this.usersService.remove(+dbIndex, +id);
  }
}
