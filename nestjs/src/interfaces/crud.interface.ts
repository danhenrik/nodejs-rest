import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

export interface ICrud {
  create(user: CreateUserDto);
  getAll();
  getById(id: number);
  update(id: number, user: UpdateUserDto);
  delete(id: number);
}
