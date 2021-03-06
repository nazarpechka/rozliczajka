const { ForbiddenError } = require("../utils/errors");

module.exports = (req, res, next) => {
  if (req.user.isParticipant) {
    return next(
      new ForbiddenError(`You should be a manager to do this action!`)
    );
  }

  next();
};
