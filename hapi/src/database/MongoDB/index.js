const ICrud = require("../../interfaces/ICrud");
const mongoose = require("mongoose");
const User = require("../../models/mongo/User");

class MongoClient extends ICrud {
  constructor() {
    super();
    this.conn = mongoose.connection;
  }

  async isConnected() {
    return Promise.resolve(this.conn.readyState == 1);
  }

  async create(entity) {
    const createdUser = await User.create(entity);
    return createdUser;
  }

  async read(id = null) {
    const res = id ? await User.findById(id) : await User.find(id);
    return res;
  }

  async update(id, updatedEntity) {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found!");
    const updatedUser = await User.findOneAndUpdate(id, updatedEntity);
    return updatedUser;
  }

  async delete(id) {
    await User.findByIdAndDelete(id);
  }
}

module.exports = new MongoClient();
