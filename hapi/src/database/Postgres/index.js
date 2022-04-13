const ICrud = require("../../interfaces/ICrud");
const sequelize = require("../config");
const User = require("../../models/postgres/User");

async function connect() {
  await sequelize.sync();
  return sequelize;
}

class PostgresClient extends ICrud {
  constructor() {
    super();
    connect()
      .then((sequelize) => {
        console.log("PostgreSQL up and running!");
        this.conn = sequelize;
      })
      .catch(() => console.log("Could not connect to PostgreSQL"));
    this.User = User;
  }

  async isConnected() {
    try {
      await this.conn.authenticate();
      return true;
    } catch (_) {
      return false;
    }
  }

  async create(entity) {
    const { dataValues: createdUser } = await User.create(entity);
    return createdUser;
  }

  async read(id = null) {
    const res = id ? await User.findByPk(id) : await User.findAll();
    console.log(res);
    return res;
  }

  async update(id, updatedEntity) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found!");
    Object.assign(user, updatedEntity);
    const updatedUser = await user.save();
    return updatedUser;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    await user.destroy();
  }
}

module.exports = new PostgresClient();
