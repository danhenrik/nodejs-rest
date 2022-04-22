const { error } = require('../utils/fornatOutput');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.json(error(err.message)).status(400);
};

module.exports = { errorHandler };
