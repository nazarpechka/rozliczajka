const { ForbiddenError } = require("../utils/errors");

module.exports = (req, res, next) => {
  if (req.isParticipant) {
    // const error = new Error(`You should be a manager to do this action!`);
    // error.statusCode = 403;
    return next(
      new ForbiddenError(`You should be a manager to do this action!`)
    );
  }

  next();
};
