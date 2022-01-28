const { getUsers, getUserGroups } = require("../controllers/users.controller");
const verifyToken = require("../middleware/verifyToken");
const isManager = require("../middleware/isManager");

module.exports = (router) => {
  router.route("/users").get(verifyToken, isManager, getUsers);
  router.route("/users/:id/groups").get(verifyToken, getUserGroups);
};
