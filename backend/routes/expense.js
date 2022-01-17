const { createExpense, getExpense } = require("../controllers/expense");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.route("/expense").post(verifyToken, createExpense);

  router.route("/expense/:id").get(verifyToken, getExpense);
};
