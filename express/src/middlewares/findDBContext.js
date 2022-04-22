const PostgreSQLClient = require('../database/Postgres');
const MongoDBClient = require('../database/MongoDB');
const Strategy = require('../database/Strategy');

const findDBContext = async (req, res, next) => {
  try {
    const dbCode = parseInt(req.query.db);

    let DBClient;
    if (dbCode === 0) DBClient = PostgreSQLClient;
    else if (dbCode === 1) DBClient = MongoDBClient;
    else throw new Error("query param 'db' is needed to proceed (0 or 1)");

    req.DBContext = new Strategy(DBClient);
    const isConnected = await req.DBContext.isConnected();
    if (isConnected) next();
    else throw new Error('Could not connect to database');
  } catch (err) {
    next(err);
  }
};

module.exports = { findDBContext };
