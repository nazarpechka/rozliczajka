const ExpenseModel = require("../models/expense");
const GroupModel = require("../models/group");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

module.exports = {
  createExpense: async (req, res, next) => {
    try {
      const users = req.body.subexpenses.map((subexpense) => subexpense.user);
      const amountsSum = req.body.subexpenses.reduce((a, b) => a + b.amount, 0);

      const group = await GroupModel.findById(req.body.group);

      if (!group) {
        throw new NotFoundError("Group with provided ID doesn't exist");
      }

      if (!group.participants.includes(req.user._id)) {
        throw new ForbiddenError("You are not a participant in this group!");
      }

      if (!users.every((id) => group.participants.includes(id))) {
        throw new BadRequestError(
          "One of users provided is not a participant in this group!"
        );
      }

      if (Math.abs(req.body.amount - amountsSum) > 0.5) {
        throw new BadRequestError(
          "Sum of subexpenses amounts doesn't add up to the expense total amount!"
        );
      }

      const expense = await ExpenseModel.create(req.body);
      res.send(expense);
    } catch (err) {
      next(err);
    }
  },

  getExpense: async (req, res, next) => {
    try {
      const expense = await ExpenseModel.findById(req.params.id).populate(
        "group",
        "name participants"
      );
      if (!expense) {
        throw new NotFoundError("Expense not found!");
      }

      if (!expense.group.participants.includes(req.user._id)) {
        throw new ForbiddenError(
          "You are not a participant of this expense's group!"
        );
      }

      res.send(expense);
    } catch (err) {
      next(err);
    }
  },
};
