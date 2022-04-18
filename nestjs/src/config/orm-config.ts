import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export default () => [
  TypeOrmModule.forRoot({
    // name: 'pg',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'admin',
    password: '3321',
    database: 'main',
    entities: [User],
    synchronize: true,
  }),
  /*
  TypeOrmModule.forRoot({
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: 27017,
    username: 'admin',
    password: '3321',
    entities: [User],
    synchronize: true,
  }),
  */
];

/*
export default () => [
  TypeOrmModule.forRoot({
    name: 'pg',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'admin',
    password: '3321',
    database: 'main',
    entities: [User],
    synchronize: true,
  }),
  TypeOrmModule.forRoot({
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: 27017,
    username: 'admin',
    password: '3321',
    entities: [User],
    synchronize: true,
  }),
];
*/
