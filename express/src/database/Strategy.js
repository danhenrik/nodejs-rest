class Crud {
  #db;

  constructor(strategy) {
    this.#db = strategy;
  }

  async isConnected() {
    return await this.#db.isConnected();
  }

  async create(user) {
    return await this.#db.create(user);
  }

  async read(id) {
    return await this.#db.read(id);
  }

  async update(id, updatedUser) {
    return await this.#db.update(id, updatedUser);
  }

  async delete(id) {
    return await this.#db.delete(id);
  }
}

module.exports = Crud;
