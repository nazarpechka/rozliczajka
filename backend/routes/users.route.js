const { getUsers, getUserGroups } = require("../controllers/users.controller");
const authenticate = require("../middleware/authenticate");
const isManager = require("../middleware/isManager");

module.exports = (router) => {
  router.route("/users").get(authenticate, isManager, getUsers);
  router.route("/users/:id/groups").get(authenticate, getUserGroups);
};
