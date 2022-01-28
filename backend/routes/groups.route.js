const {
  createGroup,
  addParticipant,
  removeParticipant,
  leaveGroup,
  getGroup,
  getExpenses,
  deactivateGroup,
} = require("../controllers/groups.controller");
const authenticate = require("../middleware/authenticate");
const isParticipant = require("../middleware/isParticipant");
const isManager = require("../middleware/isManager");

module.exports = (router) => {
  router.route("/groups").post(authenticate, isManager, createGroup);
  router.route("/groups/:id").get(authenticate, getGroup);
  router.route("/groups/:id").delete(authenticate, isManager, deactivateGroup);
  router.route("/groups/:id/expenses").get(authenticate, getExpenses);
  router
    .route("/groups/:id/participants")
    .post(authenticate, isManager, addParticipant);
  router
    .route("/groups/:id/participants")
    .delete(authenticate, isManager, removeParticipant);
  router
    .route("/groups/:id/leave")
    .post(authenticate, isParticipant, leaveGroup);
};
