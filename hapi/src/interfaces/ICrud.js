class NotImplementedError extends Error {
  constructor() {
    super("Interface - Doesn't have a implementation");
  }
}

class ICrud {
  create(instance) {
    throw NotImplementedError();
  }

  read(id) {
    throw NotImplementedError();
  }

  update(id, updatedInstance) {
    throw NotImplementedError();
  }

  delete(id) {
    throw NotImplementedError();
  }
}

module.exports = ICrud;
