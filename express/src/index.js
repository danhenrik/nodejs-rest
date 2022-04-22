require('dotenv').config();

const express = require('express');
const UserController = require('./controllers/UserController');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', UserController);
app.use(errorHandler);

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
