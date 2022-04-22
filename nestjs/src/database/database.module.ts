import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM } from 'src/config';
import { User, UserPG, UserSchema } from 'src/users/entities/user.entity';
import { PostgresClient } from './postgres-client';
import { MongoClient } from './mongo-client';
import { Database } from './database';

@Module({
  imports: [
    ...ORM(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserPG]),
  ],
  providers: [MongoClient, PostgresClient, Database],
  exports: [MongoClient, PostgresClient, Database] /* 
    Need to export so Nest have acces to it and can do the dependency injection stuff
    If we didn't export we would still be able to Use the module as normal javascript 
    but this is not recommended.
    */,
})
export class DatabaseModule {}
