const {
  createGroup,
  addUser,
  removeUser,
  leaveGroup,
  getGroup,
  getExpenses,
  deactivateGroup,
} = require("../controllers/group");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.route("/group").post(verifyToken, createGroup);

  router.route("/group/:id").get(verifyToken, getGroup);

  router.route("/group/:id/expenses").get(verifyToken, getExpenses);

  router.route("/group/:id").delete(verifyToken, deactivateGroup);

  router.route("/group/:id/user").post(verifyToken, addUser);

  router.route("/group/:id/user").delete(verifyToken, removeUser);

  router.route("/group/:id/leave").post(verifyToken, leaveGroup);
};
