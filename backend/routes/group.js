const {
  createGroup,
  addUser,
  removeUser,
  leaveGroup,
  getGroup,
} = require("../controllers/group");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.route("/group").post(verifyToken, createGroup);

  router.route("/group/:id").get(verifyToken, getGroup);

  router.route("/group/:id/addUser").post(verifyToken, addUser);

  router.route("/group/:id/removeUser").delete(verifyToken, removeUser);

  router.route("/group/:id/leave").delete(verifyToken, leaveGroup);
};
