const config = require("../auth.config.js");
const UserModel = require("../models/user");
const GroupModel = require("../models/group");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const user = new UserModel({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, createdUser) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(createdUser);
      }
    });
  },

  getGroups: (req, res) => {
    GroupModel.find({ participants: req.body.id })
      .populate("manager", "name surname")
      .exec((err, groups) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(groups);
        }
      });
  },

  login: (req, res) => {
    UserModel.findOne({ login: req.body.login }, (err, user) => {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.status(404).send({
          message: "User not found!",
        });
      } else {
        const isValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isValid) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        });

        res.status(200).send({
          message: "Logged in",
          user: {
            ...user.toObject(),
            token,
          },
        });
      }
    });
  },
};
