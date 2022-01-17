const ExpenseModel = require("../models/expense");
const GroupModel = require("../models/group");

module.exports = {
  createExpense: async (req, res) => {
    if (!req.isParticipant) {
      return res.status(400).send({
        message: "You should be a participant to add expenses!",
      });
    }

    const users = req.body.subexpenses.map((subexpense) => subexpense.user);
    const amountsSum = req.body.subexpenses.reduce((a, b) => a + b.amount, 0);

    GroupModel.findById(req.body.group, (err, group) => {
      if (err) {
        res.status(500).send(err);
      } else if (!group) {
        res.status(400).send({
          message: "Group with provided ID doesn't exist",
        });
      } else if (!group.participants.includes(req.id)) {
        console.log(req.id);
        console.log(group.participants);
        res.status(400).send({
          message: "You are not a participant in this group!",
        });
      } else if (!users.every((id) => group.participants.includes(id))) {
        res.status(400).send({
          message: "One of users provided is not a participant in this group!",
        });
      } else if (Math.abs(req.body.amount - amountsSum) > 0.5) {
        res.status(400).send({
          message:
            "Sum of subexpenses amounts doesn't add up to the expense total amount!",
        });
      } else {
        const expense = new ExpenseModel(req.body);

        expense.save((err, createdExpense) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(createdExpense);
          }
        });
      }
    });
  },

  getExpense: (req, res) => {
    ExpenseModel.findById(req.params.id)
      .populate("group", "name participants")
      .exec((err, expense) => {
        if (err) {
          res.status(500).send(err);
        } else if (!expense) {
          res.status(404).send({
            message: "Expense not found!",
          });
        } else {
          if (!expense.group.participants.includes(req.id)) {
            res.status(400).send({
              message: "You are not a participant of this expense's group!",
            });
          } else {
            res.send(expense);
          }
        }
      });
  },
};
