const {
  createGroup,
  addUser,
  leaveGroup,
  getGroup,
} = require("../controllers/group");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.route("/group").post(verifyToken, createGroup);

  router.route("/group/:id").get(verifyToken, getGroup);

  router.route("/group/:id/add-user").post(verifyToken, addUser);

  router.route("/group/:id/leave-group").delete(verifyToken, leaveGroup);
};
