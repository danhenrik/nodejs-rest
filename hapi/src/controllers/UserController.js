const PostgreSQLClient = require("../database/Postgres");
const MongoDBClient = require("../database/MongoDB");
const Strategy = require("../database/Strategy");

// TODO: Possivelmente centralizar a padronização de retorno em uma função
const createUser = async (req, head, DBContext) => {
  try {
    const user = req.payload;
    const createdUser = await DBContext.create(user);

    return { data: createdUser || null, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

const getAllUsers = async (req, head, DBContext) => {
  try {
    const users = await DBContext.read();

    return { data: users || null, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

const getUserById = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    const user = await DBContext.read(id);
    if (!user) throw new Error("User not found");

    return { data: user, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

const updateUser = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    const body = req.payload;
    const updatedUser = await DBContext.update(id, body);

    return { data: updatedUser || null, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

const deleteUser = async (req, head, DBContext) => {
  try {
    const { id } = req.params;
    await DBContext.delete(id);

    return { data: null, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

class UserController {
  async route(req, head) {
    let DBClient;
    const dbContext = parseInt(req.query.db);

    if (dbContext === 0) DBClient = PostgreSQLClient;
    else if (dbContext === 1) DBClient = MongoDBClient;
    else
      return {
        data: null,
        error: "query param 'db' is needed to proceed (0 or 1)",
      };

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
          return { data: null, error: "Route not defined" };
      }
    }
  }
}

module.exports = new UserController();
