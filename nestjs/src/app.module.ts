import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { Environment, ORM } from './config';

@Module({
  /*
   Nest will pass through the imports in the order they're specified,
   so keep that in mind, the order that you choose your import, and probably
   everything else matters to the final result.
  */
  imports: [
    Environment /* Configure environment variables */,
    ...ORM(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [...ORM()],
})
export class AppModule {}
