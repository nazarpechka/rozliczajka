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
const isParticipant = require("../middleware/isParticipant");
const isManager = require("../middleware/isManager");

module.exports = (router) => {
  router.route("/group").post(verifyToken, isManager, createGroup);

  router.route("/group/:id").get(verifyToken, getGroup);

  router.route("/group/:id/expenses").get(verifyToken, getExpenses);

  router.route("/group/:id").delete(verifyToken, isManager, deactivateGroup);

  router.route("/group/:id/user").post(verifyToken, isManager, addUser);

  router.route("/group/:id/user").delete(verifyToken, isManager, removeUser);

  router.route("/group/:id/leave").post(verifyToken, isParticipant, leaveGroup);
};
