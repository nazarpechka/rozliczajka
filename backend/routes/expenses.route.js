const {
  createExpense,
  getExpense,
} = require("../controllers/expenses.controller");
const verifyToken = require("../middleware/verifyToken");
const isParticipant = require("../middleware/isParticipant");

module.exports = (router) => {
  router.route("/expenses").post(verifyToken, isParticipant, createExpense);
  router.route("/expenses/:id").get(verifyToken, getExpense);
};
