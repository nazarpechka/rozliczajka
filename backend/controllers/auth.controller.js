const UserModel = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { BadRequestError } = require("../utils/errors");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const user = await UserModel.create({
        ...req.body,
        isParticipant: true,
      });

      const preparedUser = user.toObject();
      delete preparedUser.password;

      res.send(preparedUser);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return next(new BadRequestError(info.message));
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }

        const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY, {
          expiresIn: 86400,
        });
        return res.json({ ...user.toObject(), token });
      });
    })(req, res);
  },
};
