const { ok } = require('../utils/fornatOutput');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const createdUser = await req.DBContext.create(user);

    res.json(ok(createdUser));
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await req.DBContext.read();

    res.json(ok(users));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await req.DBContext.read(id);
    if (!user) throw new Error('User not found');

    res.json(ok(user));
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await req.DBContext.update(id, body);

    res.json(ok(updatedUser));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await req.DBContext.delete(id);

    res.json(ok());
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
