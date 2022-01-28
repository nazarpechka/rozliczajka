const {
  createGroup,
  addParticipant,
  removeParticipant,
  leaveGroup,
  getGroup,
  getExpenses,
  deactivateGroup,
} = require("../controllers/groups.controller");
const verifyToken = require("../middleware/verifyToken");
const isParticipant = require("../middleware/isParticipant");
const isManager = require("../middleware/isManager");

module.exports = (router) => {
  router.route("/groups").post(verifyToken, isManager, createGroup);
  router.route("/groups/:id").get(verifyToken, getGroup);
  router.route("/groups/:id").delete(verifyToken, isManager, deactivateGroup);
  router.route("/groups/:id/expenses").get(verifyToken, getExpenses);
  router
    .route("/groups/:id/participants")
    .post(verifyToken, isManager, addParticipant);
  router
    .route("/groups/:id/participants")
    .delete(verifyToken, isManager, removeParticipant);
  router
    .route("/groups/:id/leave")
    .post(verifyToken, isParticipant, leaveGroup);
};
