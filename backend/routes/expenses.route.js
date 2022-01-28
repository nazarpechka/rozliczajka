const {
  createExpense,
  getExpense,
} = require("../controllers/expenses.controller");
const authenticate = require("../middleware/authenticate");
const isParticipant = require("../middleware/isParticipant");

module.exports = (router) => {
  router.route("/expenses").post(authenticate, isParticipant, createExpense);
  router.route("/expenses/:id").get(authenticate, getExpense);
};
