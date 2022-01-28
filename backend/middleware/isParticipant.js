module.exports = (req, res, next) => {
  if (!req.isParticipant) {
    const error = new Error(`You should be a participant to do this action!`);
    error.statusCode = 403;
    return next(error);
  }

  next();
};
