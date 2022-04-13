const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  `postgres://admin:3321@${process.env.POSTGRES_HOST}:5432/main`
);
