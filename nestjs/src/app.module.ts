import { Module } from '@nestjs/common';
import { Environment } from './config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  /*
   Nest will pass through the imports in the order they're specified,
   so keep that in mind, the order that you choose your import, and probably
   everything else matters to the final result.
  */
  imports: [
    Environment /* Configure environment variables */,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
