import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Need to be explicitly imported,
  // won't work just because you imported it on the appModule
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
