const UserModel = require("../models/user");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { BadRequestError } = require("../utils/errors");

module.exports = {
  signup: async (req, res, next) => {
    const user = await UserModel.create({
      ...req.body,
      isParticipant: true,
      password: bcrypt.hashSync(req.body.password, 10),
    }).catch(next);

    res.send(user);
  },

  login: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return next(new BadRequestError(info));
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
