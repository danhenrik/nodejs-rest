require('dotenv').config();

const Hapi = require('@hapi/hapi');
const UserController = require('./controllers/UserController');
const sequelize = require('./database/config');
const mongoose = require('mongoose');

const { PORT } = process.env;

const app = new Hapi.Server({ port: PORT });

// JOI é a biblioteca de validação do Hapi

app.route([
  {
    path: '/{id?}',
    method: ['POST', 'GET', 'PATCH', 'DELETE'],
    handler: UserController.route,
  },
]);

async function bootstrap() {
  try {
    await sequelize.sync().catch((e) => {
      e.message = 'Could not connect to PostgreSQL database';
      throw e;
    });
    console.log('Connected to PostgreSQL database');

    await mongoose
      .connect(`mongodb://admin:3321@${process.env.MONGODB_HOST}:27017`)
      .catch((e) => {
        e.message = 'Could not connect to MongoDB intance';
        throw e;
      });
    console.log('Connected to MongoDB instance');

    await app.start();
    console.log(`Hapi.js API listening on port ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
}

bootstrap();
