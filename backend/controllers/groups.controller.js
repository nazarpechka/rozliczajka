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
    const group = await GroupModel.create({
      name: req.body.name,
      description: req.body.description,
      manager: req.id,
    }).catch(next);
    res.send(group);
  },

  deactivateGroup: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id).catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (!group.isActive) {
      return next(new BadRequestError("Group is already deactivated!"));
    }

    if (!group.manager.equals(req.id)) {
      return next(new ForbiddenError("You are not the manager of this group!"));
    }

    group.isActive = false;
    await group.save().catch(next);

    res.send(group);
  },

  addParticipant: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id).catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (!group.isActive) {
      return next(
        new BadRequestError("Can't add participant to inactive group!")
      );
    }

    if (!group.manager.equals(req.id)) {
      return next(new ForbiddenError("You are not the manager of this group!"));
    }

    if (group.participants.includes(req.body.userId)) {
      return next(
        new BadRequestError(
          "Provided user is already a participant in this group!"
        )
      );
    }

    const user = await UserModel.findById(req.body.userId).catch(next);

    if (!user) {
      return next(new NotFoundError("User not found!"));
    }

    if (!user.isParticipant) {
      return next(
        new BadRequestError(
          "You can't add a manager to the group participants!"
        )
      );
    }

    group.participants.push(req.body.userId);
    await group.save().catch(next);

    res.send(group);
  },

  removeParticipant: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id).catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (!group.isActive) {
      return next(
        new BadRequestError("Can't remove participant from inactive group!")
      );
    }

    if (!group.manager.equals(req.id)) {
      return next(new ForbiddenError("You are not the manager of this group!"));
    }

    if (!group.participants.includes(req.body.userId)) {
      return next(
        new BadRequestError("Provided user is not a participatn of this group!")
      );
    }

    const updatedParticipants = group.participants.filter(
      (participant) => !participant.equals(req.body.userId)
    );

    group.participants = updatedParticipants;
    await group.save().catch(next);

    res.send(group);
  },

  leaveGroup: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id).catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (!group.participants.includes(req.id)) {
      return next(
        new ForbiddenError("You are not a participant in this group")
      );
    }

    const updatedParticipants = group.participants.filter(
      (participant) => !participant.equals(req.id)
    );

    group.participants = updatedParticipants;
    await group.save().catch(next);

    res.send(group);
  },

  getGroup: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id)
      .populate("manager", "name surname email city")
      .populate("participants", "name surname email city")
      .catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (
      !group.participants.find(({ _id }) => _id.equals(req.id)) &&
      !group.manager._id.equals(req.id)
    ) {
      return next(new ForbiddenError("You are not allowed to view this group"));
    }

    res.send(group);
  },

  getExpenses: async (req, res, next) => {
    const group = await GroupModel.findById(req.params.id).catch(next);

    if (!group) {
      return next(new NotFoundError("Group not found!"));
    }

    if (
      !group.participants.find(({ _id }) => _id.equals(req.id)) &&
      !group.manager._id.equals(req.id)
    ) {
      return next(
        new ForbiddenError("You are not allowed to view this group!")
      );
    }

    const expenses = await ExpenseModel.find({
      group: req.params.id,
    })
      .populate({
        path: "subexpenses",
        populate: { path: "user", model: "User" },
      })
      .populate("group")
      .catch(next);
    res.send(expenses);
  },
};
