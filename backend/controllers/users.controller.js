const UserModel = require("../models/user");
const GroupModel = require("../models/group");

const { ForbiddenError } = require("../utils/errors");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find();

      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  getUserGroups: async (req, res, next) => {
    try {
      // Participants can't see other user's groups, but managers can
      if (req.user.isParticipant && !req.user._id.equals(req.params.id)) {
        throw new ForbiddenError(
          "You are not allowed to see this user's groups!"
        );
      }

      const groups = await GroupModel.find({
        $or: [{ participants: req.params.id }, { manager: req.params.id }],
      })
        .populate("manager", "name surname")
        .populate("participants", "_id name surname");
      res.send(groups);
    } catch (err) {
      next(err);
    }
  },
};
