module.exports = (error, req, res, next) => {
  console.error("error occured", error);
  // Mongoose related errors
  if (error.name === "ValidationError") {
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
