const passport = require("passport");

const authenticate = (req, res, next) => {
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

module.exports = authenticate;
