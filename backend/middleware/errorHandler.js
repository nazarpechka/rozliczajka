// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  // Mongoose related errors
  if (error.name === "ValidationError") {
    error.statusCode = 400;
  }
  if (error.name === "CastError") {
    error.message = `Invalid value provided for ${error.path}`;
    error.statusCode = 400;
  }
  if (error.code && error.code === 11000) {
    const [field] = Object.entries(error.keyValue);
    error.message = `An account with that ${field[0]}: ${field[1]} already exists!`;
    error.statusCode = 409;
  }

  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json({ message: error.message });
};
