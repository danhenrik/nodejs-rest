require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const UserController = require('./controllers/UserController');
const sequelize = require('./database/config');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', UserController);
app.use(errorHandler);

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

    app.listen(PORT, () =>
      console.log(`Express API listening on port ${PORT}`),
    );
  } catch (err) {
    console.log(err.message);
  }
}

bootstrap();
