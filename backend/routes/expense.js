const { createExpense, getExpense } = require("../controllers/expense");
const verifyToken = require("../middleware/verifyToken");
const isParticipant = require("../middleware/isParticipant");

module.exports = (router) => {
  router.route("/expense").post(verifyToken, isParticipant, createExpense);

  router.route("/expense/:id").get(verifyToken, getExpense);
};
