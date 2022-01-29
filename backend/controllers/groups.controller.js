const GroupModel = require("../models/group");
const UserModel = require("../models/user");
const ExpenseModel = require("../models/expense");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

module.exports = {
  createGroup: async (req, res, next) => {
    try {
      const group = await GroupModel.create({
        name: req.body.name,
        description: req.body.description,
        manager: req.user._id,
      });
      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  deactivateGroup: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id);

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (!group.isActive) {
        throw new BadRequestError("Group is already deactivated!");
      }

      if (!group.manager.equals(req.user._id)) {
        throw new ForbiddenError("You are not the manager of this group!");
      }

      group.isActive = false;
      await group.save();

      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  addParticipant: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id);

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (!group.isActive) {
        throw new BadRequestError("Can't add participant to inactive group!");
      }

      if (!group.manager.equals(req.user._id)) {
        throw new ForbiddenError("You are not the manager of this group!");
      }

      if (group.participants.includes(req.body.userId)) {
        throw new BadRequestError(
          "Provided user is already a participant in this group!"
        );
      }

      const user = await UserModel.findById(req.body.userId);

      if (!user) {
        throw new NotFoundError("User not found!");
      }

      if (!user.isParticipant) {
        throw new BadRequestError(
          "You can't add a manager to the group participants!"
        );
      }

      group.participants.push(req.body.userId);
      await group.save();

      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  removeParticipant: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id);

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (!group.isActive) {
        throw new BadRequestError(
          "Can't remove participant from inactive group!"
        );
      }

      if (!group.manager.equals(req.user._id)) {
        throw new ForbiddenError("You are not the manager of this group!");
      }

      if (!group.participants.includes(req.body.userId)) {
        throw new BadRequestError(
          "Provided user is not a participatn of this group!"
        );
      }

      const updatedParticipants = group.participants.filter(
        (participant) => !participant.equals(req.body.userId)
      );

      group.participants = updatedParticipants;
      await group.save();

      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  leaveGroup: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id);

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (!group.participants.includes(req.user._id)) {
        throw new ForbiddenError("You are not a participant in this group");
      }

      const updatedParticipants = group.participants.filter(
        (participant) => !participant.equals(req.user._id)
      );

      group.participants = updatedParticipants;
      await group.save();

      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  getGroup: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id)
        .populate("manager", "name surname email city")
        .populate("participants", "name surname email city");

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (
        !group.participants.find(({ _id }) => _id.equals(req.user._id)) &&
        !group.manager._id.equals(req.user._id)
      ) {
        throw new ForbiddenError("You are not allowed to view this group");
      }

      res.send(group);
    } catch (err) {
      next(err);
    }
  },

  getExpenses: async (req, res, next) => {
    try {
      const group = await GroupModel.findById(req.params.id);

      if (!group) {
        throw new NotFoundError("Group not found!");
      }

      if (
        !group.participants.find(({ _id }) => _id.equals(req.user._id)) &&
        !group.manager._id.equals(req.user._id)
      ) {
        throw new ForbiddenError(
          "You are not allowed to view this group's expenses!"
        );
      }

      const expenses = await ExpenseModel.find({
        group: req.params.id,
      })
        .populate({
          path: "subexpenses",
          populate: { path: "user", model: "User" },
        })
        .populate("group");
      res.send(expenses);
    } catch (err) {
      next(err);
    }
  },
};
