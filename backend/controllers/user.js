const config = require("../auth.config.js");
const UserModel = require("../models/user");
const GroupModel = require("../models/group");
const ExpenseModel = require("../models/expense");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getGroups: (req, res) => {
    GroupModel.find({ participants: req.id })
      .populate("manager", "name surname")
      .exec((err, groups) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(groups);
        }
      });
  },

  getExpenses: (req, res) => {
    ExpenseModel.find({ subexpenses: { $elemMatch: { user: req.id } } }).exec(
      (err, expenses) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(expenses);
        }
      }
    );
  },

  signup: (req, res) => {
    const user = new UserModel({
      ...req.body,
      isParticipant: true,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, createdUser) => {
      if (err) {
        if (err.code === 11000) {
          res.status(500).send({ message: "User already exists!" });
        } else {
          res.status(500).send(err);
        }
      } else {
        res.send(createdUser);
      }
    });
  },

  login: (req, res) => {
    UserModel.findOne({ login: req.body.login }, (err, user) => {
      if (err) {
        res.status(500).send(err);
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

        const token = jwt.sign(
          { id: user.id, isParticipant: user.isParticipant },
          config.secret,
          {
            expiresIn: 86400,
          }
        );

        res.send({
          user: {
            ...user.toObject(),
            token,
          },
        });
      }
    });
  },
};
