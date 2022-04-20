const PostgreSQLClient = require("../database/Postgres");
const MongoDBClient = require("../database/MongoDB");
const Strategy = require("../database/Strategy");
const { ok, error } = require("../utils/fornatOutput");

const createUser = async (req, head, DBContext) => {
  try {
    const user = req.payload;
    const createdUser = await DBContext.create(user);

    return ok(createdUser);
  } catch (err) {
    return error(err);
  }
};

const getAllUsers = async (req, head, DBContext) => {
  try {
    const users = await DBContext.read();

    return ok(users);
  } catch (err) {
    return error(err);
  }
};

const getUserById = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    const user = await DBContext.read(id);
    if (!user) throw new Error("User not found");

    return ok(user);
  } catch (err) {
    return error(err);
  }
};

const updateUser = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    const body = req.payload;
    const updatedUser = await DBContext.update(id, body);

    return ok(updatedUser);
  } catch (err) {
    return error(err);
  }
};

const deleteUser = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    await DBContext.delete(id);

    return ok();
  } catch (err) {
    return error(err);
  }
};

class UserController {
  async route(req, head) {
    let DBClient;
    const dbContext = parseInt(req.query.db);

    if (dbContext === 0) DBClient = PostgreSQLClient;
    else if (dbContext === 1) DBClient = MongoDBClient;
    else return error("query param 'db' is needed to proceed (0 or 1)");

    const DBContext = new Strategy(DBClient);

    const isConnected = await DBContext.isConnected();
    if (isConnected) {
      switch (req.method) {
        case "post":
          return createUser(req, head, DBContext);
        case "get":
          if (req.params.id) return getUserById(req, head, DBContext);
          return getAllUsers(req, head, DBContext);
        case "patch":
          return updateUser(req, head, DBContext);
        case "delete":
          return deleteUser(req, head, DBContext);
        default:
          return error("Route not defined");
      }
    }
    return error("Could not connect to data source");
  }
}

module.exports = new UserController();
