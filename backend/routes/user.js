const { createUser, getGroups, login } = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.route("/user/groups").get(verifyToken, getGroups);

  router.route("/user/signup").post(createUser);

  router.route("/user/login").post(login);
};
