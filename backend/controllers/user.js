const config = require("../auth.config.js");
const UserModel = require("../models/user");
const GroupModel = require("../models/group");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BadRequestError, NotFoundError } = require("../utils/errors");

module.exports = {
  getGroups: async (req, res, next) => {
    const groups = await GroupModel.find({
      $or: [{ participants: req.id }, { manager: req.id }],
    })
      .populate("manager", "name surname")
      .populate("participants", "_id name surname")
      .catch(next);

    res.send(groups);
  },

  getUsers: async (req, res, next) => {
    const users = await UserModel.find().catch(next);

    res.send(users);
  },

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
