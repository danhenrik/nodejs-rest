const ICrud = require("../../interfaces/ICrud");
const mongoose = require("mongoose");
const User = require("../../models/mongo/User");

async function connect() {
  await mongoose.connect(
    `mongodb://admin:3321@${process.env.MONGODB_HOST}:27017`
  );
}

class MongoClient extends ICrud {
  constructor() {
    super();
    connect().catch((e) => {
      console.log("Could not connect to MongoDB");
      console.error(e);
    });
    this.conn = mongoose.connection;
    this.conn.once("open", () => console.log("MongoDB up and running!"));
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
