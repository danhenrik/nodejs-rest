const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../routes/UserRoutes');
const { findDBContext } = require('../middlewares/findDBContext');

router.use(findDBContext);

router.route('/')
  .post(createUser)
  .get(getAllUsers);

router.route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
