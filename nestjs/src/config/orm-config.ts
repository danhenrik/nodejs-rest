import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPG } from '../users/entities/user.entity';

export default () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'admin',
    password: '3321',
    database: 'main',
    entities: [UserPG],
    synchronize: true,
  }),
  MongooseModule.forRoot(
    `mongodb://admin:3321@${process.env.MONGODB_HOST}:27017`,
  ),
];
