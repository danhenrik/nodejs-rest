const ICrud = require('../../interfaces/ICrud');
const sequelize = require('../config');
const User = require('../../models/postgres/User');

class PostgresClient extends ICrud {
  constructor() {
    super();
    this.conn = sequelize;
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
    return res;
  }

  async update(id, updatedEntity) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    Object.assign(user, updatedEntity);
    const updatedUser = await user.save();
    return updatedUser;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    await user.destroy();
  }
}

module.exports = new PostgresClient();
