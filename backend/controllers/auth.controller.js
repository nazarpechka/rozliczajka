const config = require("../auth.config.js");
const UserModel = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BadRequestError, NotFoundError } = require("../utils/errors");

module.exports = {
  signup: async (req, res, next) => {
    const user = await UserModel.create({
      ...req.body,
      isParticipant: true,
      password: bcrypt.hashSync(req.body.password, 8),
    }).catch(next);

    res.send(user);
  },

  login: async (req, res, next) => {
    const user = await UserModel.findOne({ login: req.body.login }).catch(next);

    if (!user) {
      return next(new NotFoundError("Invalid login!"));
    }

    const isValid = await bcrypt
      .compare(req.body.password, user.password)
      .catch(next);

    if (!isValid) {
      return next(new BadRequestError("Invalid Password!"));
    }

    const token = jwt.sign(
      { id: user.id, isParticipant: user.isParticipant },
      config.secret,
      {
        expiresIn: 86400,
      }
    );

    res.send({
      ...user.toObject(),
      token,
    });
  },
};
