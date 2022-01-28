const UserModel = require("../models/user");
const GroupModel = require("../models/group");

const { BadRequestError } = require("../utils/errors");

module.exports = {
  getUsers: async (req, res, next) => {
    const users = await UserModel.find().catch(next);

    res.send(users);
  },

  getUserGroups: async (req, res, next) => {
    // Participants can't see other user's groups, but managers can
    if (req.isParticipant && req.id !== req.params.id) {
      return next(
        new BadRequestError("You are not allowed to see this user's groups!")
      );
    }

    const groups = await GroupModel.find({
      $or: [{ participants: req.params.id }, { manager: req.params.id }],
    })
      .populate("manager", "name surname")
      .populate("participants", "_id name surname")
      .catch(next);

    res.send(groups);
  },
};
