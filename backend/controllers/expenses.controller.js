const ExpenseModel = require("../models/expense");
const GroupModel = require("../models/group");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

module.exports = {
  createExpense: async (req, res, next) => {
    const users = req.body.subexpenses.map((subexpense) => subexpense.user);
    const amountsSum = req.body.subexpenses.reduce((a, b) => a + b.amount, 0);

    const group = await GroupModel.findById(req.body.group).catch(next);

    if (!group) {
      return next(new NotFoundError("Group with provided ID doesn't exist"));
    }

    if (!group.participants.includes(req.user._id)) {
      return next(
        new ForbiddenError("You are not a participant in this group!")
      );
    }

    if (!users.every((id) => group.participants.includes(id))) {
      return next(
        new BadRequestError(
          "One of users provided is not a participant in this group!"
        )
      );
    }

    if (Math.abs(req.body.amount - amountsSum) > 0.5) {
      return next(
        new BadRequestError(
          "Sum of subexpenses amounts doesn't add up to the expense total amount!"
        )
      );
    }

    const expense = await ExpenseModel.create(req.body).catch(next);
    res.send(expense);
  },

  getExpense: async (req, res, next) => {
    const expense = await ExpenseModel.findById(req.params.id)
      .populate("group", "name participants")
      .catch(next);

    if (!expense) {
      return next(new NotFoundError("Expense not found!"));
    }

    if (!expense.group.participants.includes(req.user._id)) {
      return next(
        new ForbiddenError("You are not a participant of this expense's group!")
      );
    }

    res.send(expense);
  },
};
